import { User } from "../models/user";
import zod from "zod"

export function validateUser(user: User){
    const userSchema = zod.object({
        username: zod.string().min(3).max(30),
        password: zod.string().min(6)
    })

    const result = userSchema.safeParse(user)
    return result
}