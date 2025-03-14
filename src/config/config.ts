import dotenv from "dotenv"

dotenv.config()

export const PORT: string = process.env.PORT || '3000'
export const MONGO_URI: string = process.env.PORT || "mongodb://localhost:27017/ips-radaur"