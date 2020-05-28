import { Request, Response } from "express";
import { Connection } from "typeorm";

import { Store } from "src/entity/store";
import { sendOK, sendError } from "src/response";

export const storesFindFullText = (db: Connection) => {
  return async (req: Request, res: Response) => {
    try {
      const searchQueries = [
        {
          column: "name",
          text: (req.query.name as string) || "",
        },
        {
          column: "genre",
          text: (req.query.genre as string) || "",
        },
        {
          column: "address",
          text: (req.query.address as string) || "",
        },
      ].filter((search) => search.text !== "");

      let query = await db.manager
        .getRepository(Store)
        .createQueryBuilder()
        .select();

      searchQueries.forEach((search, index) => {
        if (index === 0) {
          return query.where(
            // escape user input value, when performing raw SQL.
            `MATCH(${search.column}) AGAINST (:text IN BOOLEAN MODE)`,
            { text: search.text }
          );
        }

        return query.andWhere(
          // escape user input value, when performing raw SQL.
          `MATCH(${search.column}) AGAINST (:text IN BOOLEAN MODE)`,
          { text: search.text }
        );
      });

      const stores = await query.orderBy(`score`, "DESC").getMany();
      sendOK(res, stores);
    } catch (e) {
      console.error(e);
      return sendError(res, 500, "error");
    }
  };
};
