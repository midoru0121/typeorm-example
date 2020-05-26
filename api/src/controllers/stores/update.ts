import { Request, Response } from "express";
import { validationResult, check } from "express-validator";
import { Connection } from "typeorm";

import { Store } from "src/entity/store";
import { sendOK, sendError } from "src/response";

export const validateStoreUpdate = [check("id").not().isEmpty().isNumeric()];

export const storesUpdate = (db: Connection) => {
  return async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const storeRepository = await db.getRepository(Store);
        const store = await storeRepository.findOne({
          where: {
            id: req.params.id,
          },
        });

        if (!store) {
          return sendError(res, 404, "Not Found");
        }

        store.name = req.body.name || store.name;
        store.genre = req.body.genre || store.genre;
        store.address = req.body.address || store.address;
        await storeRepository.save(store);
        return sendOK(res, store);
      }

      return sendError(res, 400, "Bad Request");
    } catch (e) {
      console.error(e);
      return sendError(res, 500, "error");
    }
  };
};
