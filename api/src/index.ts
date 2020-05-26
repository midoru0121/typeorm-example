import { initializeApp } from "src/initializer";
import { storesIndex } from "src/controllers/stores";
import { storesCreate } from "src/controllers/stores/create";
import { storesShow, validateStoreShow } from "src/controllers/stores/show";
import {
  storesUpdate,
  validateStoreUpdate,
} from "src/controllers/stores/update";
import {
  storesShowByName,
  validateStoreShowByName,
} from "src/controllers/stores/showbyName";

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
  expressApp.post("/stores/", storesCreate(db));

  // update one store
  expressApp.put("/stores/:id", validateStoreUpdate, storesUpdate(db));

  // store Like Query
  expressApp.get(
    "/stores/showByName/:id",
    validateStoreShowByName,
    storesShowByName(db)
  );

  expressApp.listen(process.env.APP_PORT, () => {
    console.log(`Node Server started!`);
  });
})();

export type App = ReturnType<typeof initializeApp>;
