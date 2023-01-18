import express, { Application } from "express";
import dbConnection from "../config/DBconnect";
import appConfig from "./app";

const port: number = 5500;

const server: Application = express();

appConfig(server);
dbConnection();

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
