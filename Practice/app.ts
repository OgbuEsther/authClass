import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

const appConfig = (app: Application) => {
  app.use(express.json()).use(cors()).use(morgan("dev"));

  //   app.use("/api/auth");
};

export default appConfig;
