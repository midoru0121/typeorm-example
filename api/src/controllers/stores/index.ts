import { Request, Response } from "express";
import { Connection } from "typeorm";

import { Store } from "src/entity/store";
import { sendError } from "src/response";
import { sendOK } from "src/response";

export const storesIndex = (db: Connection) => {
  return async (_req: Request, res: Response) => {
    try {
      const storeRepository = db.getRepository(Store);

      // Fetch All Data
      const stores = await storeRepository.find();
      return sendOK(res, stores);
    } catch (e) {
      console.error(e);
      return sendError(res, 500, "error");
    }
  };
};
