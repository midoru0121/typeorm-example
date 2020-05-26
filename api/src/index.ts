import { initializeApp } from "src/initializer";
import { storesIndex } from "./controllers/stores";
import { storesCreate } from "./controllers/stores/create";
import { storesShow, validateStoreShow } from "./controllers/stores/show";

if (!process.env.APP_PORT) {
  process.exit();
}

(async () => {
  const { expressApp, db } = await initializeApp();
  expressApp.get("/stores", storesIndex(db));
  expressApp.get("/stores/:id", validateStoreShow, storesShow(db));
  expressApp.post("/stores/", storesCreate(db));

  expressApp.listen(process.env.APP_PORT, () => {
    console.log(`Node Server started!`);
  });
})();

export type A = ReturnType<typeof initializeApp>;
