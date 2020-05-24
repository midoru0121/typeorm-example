import { initializeApp } from "src/initializer";

if (!process.env.APP_PORT) {
  process.exit();
}

(async () => {
  const { expressApp, db } = await initializeApp();

  expressApp.listen(process.env.APP_PORT, () => {
    console.log(process.env.APP_PORT);
  });
})();

export type A = ReturnType<typeof initializeApp>;
