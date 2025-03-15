import { Request, Response, Router } from "express";
import { login, signUp } from "./user/auth";
import userModel, { User } from "../models/user";
import bcrypt from "bcrypt"

const router = Router()

router.post("/signup", signUp)
router.post("/login", login)

export default router