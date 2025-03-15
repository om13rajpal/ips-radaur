import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config"

export interface TokenData {
    id: unknown
    username: string
}

export function generateToken(tokenData: TokenData, expiryTime: number) : string {
    return jwt.sign(tokenData, JWT_SECRET, {expiresIn: expiryTime})
}