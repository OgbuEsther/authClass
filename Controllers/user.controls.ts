import userModel from "../Models/user.model";
import { Request, Response } from "express";
//bcrypt
import bcrypt from "bcrypt";
export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password, isAdmin, stack } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      stack,
    });
    if (!user) return res.status(401).json("please enter the reqiured fields");
    return res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred",
      data: error,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(401).json({ status: "please enter a valid email" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "user not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "check your password",
      });
    }
    return res.status(200).json({
      message: `welcome ${user.name}`,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred",
      data: error,
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getAll = await userModel.find();

    return res.status(200).json({
      message: `${getAll.length} users(s)`,
      data: getAll,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred",
      data: error,
    });
  }
};
