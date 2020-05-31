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

      const reviewsScoreAverage = await transactionalEntityManager
        .createQueryBuilder()
        .select("TRUNCATE(AVG(score), 1)", "score")
        .from(Review, "reviews")
        .getRawOne();

      const store = await transactionalEntityManager.findOne(Store, {
        where: {
          id: storeId,
        },
      });

      if (!store) {
        throw new Error("store not found");
      }

      // set the avarage score to the store
      store.score = reviewsScoreAverage;
      await transactionalEntityManager.save(store);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  });
