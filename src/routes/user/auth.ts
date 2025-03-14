import { Request, Response } from "express";
import userModel, { User } from "../../models/user";
import bcrypt from "bcrypt";

export async function signUp(req: Request, res: Response) {
  const userBody: User = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userBody.password, salt);

    userBody.password = hashedPassword;

    const user = new userModel(userBody);
    const savedUser = await user.save();

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (err: any) {
    if (err["code"] === 11000) {
      res.status(400).json({
        status: false,
        message: "Username already exists",
      });
      return;
    }
    res.status(400).send(err);
    return;
  }
}
