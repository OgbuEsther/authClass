import userModel from "../Models/user.model";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError, HttpCode } from "../utils/AppError";
import { userData } from "../Interfaces/user.interface";

import bcrypt from "bcrypt";
export const register = asyncHandler(
  async (
    req: Request<{}, {}, userData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password, isAdmin, stack } = req.body || {};

    const salt: string = await bcrypt.genSalt(12);
    const hashed: string = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashed,
      isAdmin,
      stack,
    });
    if (!user) {
      next(
        new AppError({
          message: "Account not Created",
          httpCode: HttpCode.BAD_REQUEST,
          isOperational: true,
        })
      );
    }
    return res.status(200).json({
      user,
    });
  }
);

export const login = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      next(
        new AppError({
          message: "User not found",
          httpCode: HttpCode.NOT_FOUND,
          isOperational: true,
        })
      );
    }
    const checkpass = await bcrypt.compare(password, user!.password);
    if (!checkpass) {
      next(
        new AppError({
          message: "Email or password not correct",
          httpCode: HttpCode.UNAUTHORIZED,
          isOperational: true,
        })
      );
    }

    return res.status(200).json({ message: `Welcome ${user!.name}` });
  }
);

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
