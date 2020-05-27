import "reflect-metadata";
import { createConnection } from "typeorm";
import { Store } from "src/entity/store";
import { Review } from "src/entity/review";

const database = process.env.DB_NAME || "";
const username = process.env.DB_USER || "";
const password = process.env.DB_PASS || "";
const host = process.env.DB_HOST || "";
const port = Number(process.env.DB_PORT) || 3306;

export const genConnection = async () =>
  createConnection({
    type: "mysql",
    host,
    port,
    username,
    password,
    database,
    entities: [Store, Review],
    synchronize: false,
    logging: process.env.NODE_ENV == "production" ? false : true,
  });
