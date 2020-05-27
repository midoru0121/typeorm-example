import express, { Express } from "express";
import helmet = require("helmet");
import { genConnection } from "src/db";
import * as bodyParser from "body-parser";

const configureServer = (expressApp: Express) => {
  expressApp.use(helmet());
  expressApp.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  expressApp.use(bodyParser.json());
};

export const initializeApp = async () => {
  const expressApp = express();
  configureServer(expressApp);
  const db = await genConnection();

  const application = {
    expressApp,
    db,
  };
  return application;
};

export type App = ReturnType<typeof initializeApp> extends Promise<infer T>
  ? T
  : never;
