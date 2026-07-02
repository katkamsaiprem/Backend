import { SelectUser } from "@/db/schema/users.schema.js"
import { RegisterInput } from "@/types/index.js"
import * as authRepository from "@/auth/auth.repository.js"
import { AppError } from "@/middlewares/globalErrorHandler.middlewares.js"
import { compareToken, hashPassword, hashToken, verifyPassword } from "@/utils/hash.utils.js"
import { generateTokenPair, verifyRefreshToken } from "@/utils/jwt.utils.js"
import { LoginInput } from "@/types/index.js"




/**
 *  Register Service
 *  - username and gmail should be unique
 *  - hash the pass before storing 
 *  - return tokens ( login the user immediately after registration)
 * 
 * @param payload 
 * @returns {}
 */

export const createUserService = async ({ username, email, password }: RegisterInput) => {

    // sanitize inputs 
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await authRepository.findUserByEmailOrUserNameRepository({
        username: cleanUsername,
        email: cleanEmail,
    })

    if (existingUser) {
        if (existingUser.email === cleanEmail)
            throw new AppError("Email already exists", 409)
        else if (existingUser.username === cleanUsername)
            throw new AppError("Username already exists", 409)
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await authRepository.createUserRepository({ username: cleanUsername, email: cleanEmail, passwordHash: hashedPassword })

    const tokens = generateTokenPair({ id: newUser.id, role: newUser.role })

    return {
        tokens,
        user: sanitizeUser(newUser)
    }
}



export const loginService = async ({ email, password }: LoginInput) => {

    const cleanEmail = email.trim().toLowerCase()

    const user = await authRepository.findUserByEmail({ email: cleanEmail })

    if (!user) {

        throw new AppError("Invalid email or password", 401)
    }

    if (!user.isActive) {

        throw new AppError(" Your Account has been deactivated ,Please contact support", 403)
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash)
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401)
    }

    const tokens = generateTokenPair({ id: user.id, role: user.role })

    const refreshTokenHashed = await hashToken(tokens.refreshToken)

    await authRepository.saveRefreshToken({ id: user.id, refreshTokenHash: refreshTokenHashed })

    return {
        tokens,
        user: sanitizeUser(user)
    }

}

/**
 * @description 
 * Refresh Token service
 *  - this is how user get new access token when old is expired
 *  Business rules
 *  - verify jwt sign not be tampered , not expired
 *  - user must be exist and active
 *  - does user have refreshtoken
 *  - incoming token must match the db token to prevent token reuse ,
 *
 *  - remove all session(remove refreshToken) for this user 
 *  - generate new tokenPair and hash refreshToken ,then save to db
 *  @returns { user: sanitize(user) , tokens}     
 */

export const refreshToken = async (token: string) => {

    let decoded
    try {
        decoded = verifyRefreshToken(token)

    }
    catch (error) {
        // this block is to catch runtime errors thrown by jwt.verify
        throw new AppError("Invalid or expired refresh token", 401)
    }

    if (!decoded.sub) {
        throw new AppError("Invalid token", 401)
    }

    const user = await authRepository.findUserById({ id: Number(decoded.sub) })

    if (!user || !user.isActive) {
        throw new AppError("User not found or deactivated", 401)
    }

    if (!user.refreshTokenHash) {
        throw new AppError("No active session found. Please login again ", 401)
    }
    // - if user already used this token to refresh , then the db had a diff token , old token wont match

    const isValidToken = await compareToken(token, user.refreshTokenHash)

    if (!isValidToken) {

        await authRepository.revokeRefreshToken({ id: user.id })
        throw new AppError("Refresh token reuse detected. Please login again", 401)
    }

    const tokens = generateTokenPair({ id: user.id, role: user.role })

    const hashedRefreshToken = await hashToken(tokens.refreshToken)

    const isRotated = await authRepository.rotateRefreshToken({
        id: user.id,
        oldRefreshTokenHash: user.refreshTokenHash,
        newRefreshTokenHash: hashedRefreshToken
    })

    if (!isRotated) {
        await authRepository.revokeRefreshToken({ id: user.id })
        throw new AppError("Refresh token reuse detected. Please login again", 401)
    }

    return {
        tokens,
        user: sanitizeUser(user)
    }
}

/**
 * @description
 * - revoke the refresh token in DB
 * - access token still valid untill it expires 
 * - but without refresh token ,user cant renew it
 * - cookies are cleared on client side by the controller 
 */
export const logoutUser = async (id: Pick<SelectUser, "id">) => {

    await authRepository.revokeRefreshToken(id);
}


// we can reuse this type in middlewares as well , we can export it from here
export type SafeUser = Omit<SelectUser, "passwordHash" | "refreshTokenHash" | "issuedRefreshTokenAt">

// remove sensitive fields before sending data to client
const sanitizeUser = (user: SelectUser): SafeUser => {
    // we are using rest operator to shollow copy remaining properties
    const { passwordHash, refreshTokenHash, issuedRefreshTokenAt, ...safeUser } = user
    return safeUser;
}
