// import express, { Application } from "express";
// import dbConnection from "../config/DBconnect";
// import appConfig from "./app";

// const port: number = 5500;

// const server: Application = express();

// appConfig(server);
// dbConnection();

// server.listen(port, () => {
//   console.log(`server is up on port ${port}`);
// });

import express from "express";
import appConfig from "./app";
import dbConnection from "../config/DBconnect";

const port: number = 5040;

const server = express();

appConfig(server);
dbConnection();

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
