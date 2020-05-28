import { Connection } from "typeorm";
import { Review } from "src/entity/review";
import { Store } from "src/entity/store";

type Args = {
  db: Connection;
  storeId: number;
  score: number;
  title: string;
  content: string;
};

export const avarageScoreReviewsService = async ({
  db,
  storeId,
  score,
  title,
  content,
}: Args) =>
  db.transaction(async (transactionalEntityManager) => {
    try {
      const newReview = transactionalEntityManager.create(Review, {
        storeId: storeId,
        score: score,
        title: title,
        content: content,
      });

      // Create a review
      await transactionalEntityManager.save(newReview);

      // Get all of the reviews the store has
      const reviews = await transactionalEntityManager.find(Review, {
        where: {
          storeId,
        },
      });

      // Calculate avarage score.
      const reviewScores = reviews.map((review) => review.score);
      const scoreSum = reviewScores.reduce((acc, cur) => acc + cur);
      const scoreAvarage = scoreSum / reviewScores.length;
      const storeScore = Math.ceil(scoreAvarage * 10) / 10;

      const store = await transactionalEntityManager.findOne(Store, {
        where: {
          id: storeId,
        },
      });

      if (!store) {
        throw new Error("store not found");
      }

      // set the avarage score to the store
      store!.score = storeScore;
      await transactionalEntityManager.save(store);
    } catch (e) {
      throw new Error(e);
    }
  });
