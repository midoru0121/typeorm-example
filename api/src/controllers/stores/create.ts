import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Connection } from "typeorm";

import { Store } from "src/entity/store";
import { sendOK, sendError } from "src/response";

export const validateStoreCreate = [
  check("name").not().isEmpty(),
  check("address").not().isEmpty(),
  check("genre").not().isEmpty(),
];

export const storesCreate = (db: Connection) => {
  return async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const name = req.body.name || "";
        const genre = req.body.genre || "";
        const address = req.body.address || "";

        const storeRepository = db.getRepository(Store);
        const store = storeRepository.create({
          name,
          score: 0,
          genre,
          address,
        });

        await storeRepository.save(store);
        return sendOK(res, "store was created successfully!");
      }

      return sendError(res, 400);
    } catch (e) {
      console.error(e);
      return sendError(res, 500, "error");
    }
  };
};
