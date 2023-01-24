import { Router } from "express";
import { getAll } from "../controller/user.controls";

const userRouter = Router();

userRouter.route("/").get(getAll);
