import { Request, Response } from "express";
import { Connection, Like } from "typeorm";
import { Store } from "src/entity/store";
import { sendError } from "src/response";
import { sendOK } from "src/response";
import { check, validationResult } from "express-validator";

export const validateStoreShowByName = [
  check("id").not().isEmpty().isNumeric(),
];

export const storesShowByName = (db: Connection) => {
  return async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const storeRepository = db.getRepository(Store);
        const name = Like(`%${req.query.name}%`);

        // Fetch Like
        const stores = await storeRepository.find({
          where: {
            name,
          },
        });
        return sendOK(res, stores);
      }
      return sendError(res, 400, "Bad Request");
    } catch (e) {
      console.error(e);
      return sendError(res, 500, "error");
    }
  };
};
