import { Request, Response } from "express";
import { Connection } from "typeorm";
import { check, validationResult } from "express-validator";

import { sendError, sendOK } from "src/response";
import { avarageScoreReviewsService as createReviewsAndCalcScoreAvarageService } from "~/src/services/avarageScoreReviews";

export const validatereviewsCreate = [
  check("storeId").not().isEmpty(),
  check("score").not().isEmpty(),
  check("score").isNumeric().isLength({ min: 1, max: 5 }),
  check("title").not().isEmpty(),
  check("content").not().isEmpty(),
  check("content").isString().isLength({ max: 1000 }),
];

export const reviewsCreate = (db: Connection) => {
  return async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        await createReviewsAndCalcScoreAvarageService({
          db,
          storeId: req.body.storeId,
          score: req.body.score,
          title: req.body.title,
          content: req.body.content,
        });
        return sendOK(res, "OK");
      } catch (e) {
        return sendError(res, 500);
      }
    }

    sendError(res, 400, "bad request");
  };
};
