import express, { Application } from "express";
import cors from "cors";
import router from "../Routes/user.routes";
import morgan from "morgan";

// export default function appConfig(app: Application) {
//   app.use(express.json()).use(cors());
// }

const appConfig = (app: Application) => {
  //middlewares
  app.use(express.json()).use(cors()).use(morgan("dev"));

  //router
  app.use("/api/auth", router);
};

export default appConfig;
