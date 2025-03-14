import { Request, Response, Router } from "express";
import { signUp } from "./user/auth";
import userModel, { User } from "../models/user";
import bcrypt from "bcrypt"

const router = Router()

router.post("/signup", signUp)

export default router