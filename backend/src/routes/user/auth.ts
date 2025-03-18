import { Request, Response } from "express";
import userModel, { User } from "../../models/user";
import { generateToken, TokenData } from "../../utils/generateToken";
import { comparePassword, hashPassword } from "../../utils/password";
import { sendMail } from "../../utils/mail";
import { validateUser } from "../../utils/zod";

export async function signUp(req: Request, res: Response) {
  const userBody: User = req.body;

  try {
    const validBody = validateUser(userBody);

    if (!validBody.success) {
      res.status(400).json({
        status: false,
        message: "Invalid Inputs",
        error: validBody.error.errors.map((err) => err.message),
      });
      return;
    }

    userBody.password = await hashPassword(userBody.password);

    const user = new userModel(userBody);
    const savedUser = await user.save();

    const tokenData: TokenData = {
      id: savedUser._id,
      username: savedUser.username,
    };

    const token = generateToken(tokenData, 3600);
    sendMail(
      userBody.username,
      "Welcome to IPS Radaur",
      `Hello ${userBody.username},\n\nWelcome to IPS Radaur. You have successfully registered on our platform.\n\nThanks,\nTeam IPS Radaur`
    );

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      token: token,
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

export async function login(req: Request, res: Response) {
  const userBody: User = req.body;

  try {
    const validBody = validateUser(userBody);

    if (!validBody.success) {
      res.status(400).json({
        status: false,
        message: "Invalid Inputs",
        error: validBody.error.errors.map((err) => err.message),
      });
      return;
    }

    const user = await userModel.findOne({
      username: userBody.username,
    });

    if (!user) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
      return;
    }

    const isValidPassword = comparePassword(userBody.password, user.password);
    if (!isValidPassword) {
      res.status(400).json({
        status: false,
        message: "Invalid password",
      });
      return;
    }

    const tokenData: TokenData = {
      id: user._id,
      username: user.username,
    };

    const token = generateToken(tokenData, 3600);

    res.json({
      status: true,
      message: "User logged in successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "An error occurred",
      error: error,
    });
  }
}
