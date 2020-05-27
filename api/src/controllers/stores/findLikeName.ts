import { Request, Response } from "express";
import { Connection, Like } from "typeorm";
import { Store } from "src/entity/store";
import { sendError } from "src/response";
import { sendOK } from "src/response";

export const storesFindLikeName = (db: Connection) => {
  return async (req: Request, res: Response) => {
    try {
      const storeRepository = db.getRepository(Store);
      const name = Like(`%${req.query.name}%`);

      // Fetch Like
      const stores = await storeRepository.find({
        where: {
          name,
        },
      });
      return sendOK(res, stores);
    } catch (e) {
      console.error(e);
      return sendError(res, 500, "error");
    }
  };
};
