import express, { Application } from "express";
import appConfig from "./app";
import dbConfig from "./config/db";
const port: number = 5050;

const app: Application = express();
appConfig(app);
dbConfig();

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
