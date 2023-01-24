import userModel from "../model/user.model";

import { Request, Response } from "express";

import bcrypt from "bcrypt";

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userModel.find();
    return res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed",
      data: error,
    });
  }
};

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { isAdmin, stack, email, name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      isAdmin,
      stack,
      email,
      name,
      password: hashedPassword,
    });
    if (!user) {
      return res.status(401).json({
        message: "please fill in the fields",
      });
    }

    return res.status(201).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed",
      data: error,
    });
  }
};



export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body
        if(!email){
            return res.status(401).json({
                message : "please put your email"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message : "user not found"
            })
        }
        const passwordCheck = await bcrypt.compare(user.password, password)
        if (!passwordCheck) {
            return res.status(401).json({
                message : "check your password"
            })
        }
        return res.status(201).json({
            message: "login suucessfull",
            data : user
        })
    } catch (error) {
         return res.status(400).json({
           message: "failed",
           data: error,
         });
    }
}