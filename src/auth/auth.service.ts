import { InsertUser } from "@/db/schema/users.schema.js"
import { createUserRepository, findUserByEmailOrUserNameRepository } from "./auth.repository.js"
import { AppError } from "@/middlewares/globalErrorHandler.middlewares.js"
import { hashPassword } from "@/utils/hash.utils.js"
import { generateTokenPair } from "@/utils/jwt.utils.js"




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

    // sanitize inputs 
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await findUserByEmailOrUserNameRepository({
        username: cleanUsername,
        email: cleanEmail,
    })

    if (existingUser) {
        if (existingUser.email === cleanEmail)
            throw new AppError("Email already exists", 409)
        else if (existingUser.username === cleanUsername)
            throw new AppError("Username already exists", 409)
    }

    const hashedPassword = await hashPassword(passwordHash)

    const newUser = await createUserRepository({ username: cleanUsername, email: cleanEmail, passwordHash: hashedPassword })

    const tokens = generateTokenPair({ id: newUser.id, role: newUser.role })

    return {
        tokens,
        user: sanitizeUser(newUser)
    }
}

// remove sensitive fields before sending data to client
function sanitizeUser(user: InsertUser) {
    // we are using rest operator to shollow copy remaining properties
    const { passwordHash, refreshTokenHash, issuedRefreshTokenAt, ...safeUser } = user
    return safeUser;
}