import { initializeApp } from "src/initializer";
import { storesIndex } from "src/controllers/stores";
import { storesCreate } from "src/controllers/stores/create";
import { storesShow, validateStoreShow } from "src/controllers/stores/show";
import {
  storesUpdate,
  validateStoreUpdate,
} from "src/controllers/stores/update";
import { storesFindLikeName } from "~/src/controllers/stores/findLikeName";
import { storesFindFullText } from "~/src/controllers/stores/findFullText";
import { reviewsCreate } from "./controllers/reviews/create";

if (!process.env.APP_PORT) {
  process.exit();
}

(async () => {
  const { expressApp, db } = await initializeApp();

  // fetch all stores
  expressApp.get("/stores", storesIndex(db));

  // fetch one store
  expressApp.get("/stores/:id", validateStoreShow, storesShow(db));

  // create one store
  expressApp.post("/stores", storesCreate(db));

  // update one store
  expressApp.put("/stores/:id", validateStoreUpdate, storesUpdate(db));

  // fetch stores with Like Query
  expressApp.get("/stores/find/likeName", storesFindLikeName(db));

  // fetch stores with MySQL FullText Search Query (ngram)
  expressApp.get("/stores/find/fullText", storesFindFullText(db));

  // Create one review and set avarage score to the store the review belongs to
  expressApp.post("/reviews", reviewsCreate(db));

  expressApp.listen(process.env.APP_PORT, () => {
    console.log(`Node Server started!`);
  });
})();

export type App = ReturnType<typeof initializeApp>;
