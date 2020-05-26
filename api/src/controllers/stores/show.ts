import { Request, Response } from "express";
import { Connection } from "typeorm";

import { Store } from "src/entity/store";
import { sendError } from "src/response";
import { sendOK } from "src/response";
import { check, validationResult } from "express-validator";

export const validateStoreShow = [check("id").not().isEmpty().isNumeric()];

export const storesShow = (db: Connection) => {
  return async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        // Fetch One Data
        const store = await db.getRepository(Store).findOne({
          where: {
            id: req.query.id,
          },
        });
        return sendOK(res, store);
      }
      return sendError(res, 400, "error");
    } catch (e) {
      console.error(e);
      return sendError(res, 500, "error");
    }
  };
};
