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
          match: (req.query.name as string) || "",
        },
        {
          column: "genre",
          match: (req.query.genre as string) || "",
        },
        {
          column: "address",
          match: (req.query.address as string) || "",
        },
      ];

      const filteredSearchQueries = searchQueries.filter(
        (search) => search.match !== ""
      );

      let query = await db.manager
        .getRepository(Store)
        .createQueryBuilder()
        .select();

      filteredSearchQueries.forEach((search, index) => {
        if (index === 0) {
          return query.where(
            // escape user input value, when performing raw SQL.
            `MATCH(${search.column}) AGAINST (:match IN BOOLEAN MODE)`,
            { match: search.match }
          );
        }

        return query.andWhere(
          // escape user input value, when performing raw SQL.
          `MATCH(${search.column}) AGAINST (:match IN BOOLEAN MODE)`,
          { match: search.match }
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
