import { InsertUser } from "@/db/schema/users.schema.js"
import { createUserRepository, findUserByEmailOrUserNameRepository } from "./auth.repository.js"
import { AppError } from "@/middlewares/globalErrorHandler.middlewares.js"




/**
 *  Register Service
 *  - username and gmail should be unique
 *  - hash the pass before storing 
 *  - return tokens ( login the user immediately after registration)
 * 
 * @param payload 
 * @returns {}
 */

export const createUserService = async ({ username, email, passwordHash }: Pick<InsertUser, "username" | "email" | "passwordHash">) => {

    const existingUser = await findUserByEmailOrUserNameRepository({
        username,
        email,
    })

    if (existingUser) {
        if (existingUser.email === email.toLocaleLowerCase())
            throw new AppError("Email already exists", 409)
        else if (existingUser.username === username)
            throw new AppError("Username already exists", 409)
    }

    


}