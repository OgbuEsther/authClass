import { Router } from "express";
import { getAllUsers, login, register } from "../Controllers/user.controls";

const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/").get(getAllUsers);

export default router;
