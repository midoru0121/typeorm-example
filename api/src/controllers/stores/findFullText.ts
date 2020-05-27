import { Request, Response } from "express";
import { Connection } from "typeorm";

import { Store } from "src/entity/store";
import { sendOK, sendError } from "src/response";
import SqlString from "sqlstring";

const composeSearchQuery = ({
  column,
  match,
}: {
  column: string;
  match: string;
}) => `MATCH(${column}) AGAINST (${SqlString.escape(match)} IN BOOLEAN MODE)`;

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
            composeSearchQuery({ match: search.match, column: search.column })
          );
        }

        return query.andWhere(
          composeSearchQuery({ match: search.match, column: search.column })
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
