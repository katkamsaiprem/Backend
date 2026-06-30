//TODO
// code related to Sign , verify , decode tokens

import jwt, { JwtPayload } from "jsonwebtoken";
import { SelectUser } from "@/db/schema/users.schema.js";
import { env } from "@/config/env.js";


// this token travels with every request
export const generateAccessToken = ({ id: userId, role }: Pick<SelectUser, "id" | "role">) => {

    return jwt.sign({
        sub: userId,
        role: role
    },
        env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: env.ACCESS_TOKEN_EXPIRY,
            issuer: "myapp-api",
            audience: "myapp-client",
        }
    )

}


// its only job is to get a new access token
export const generateRefreshToken = ({ id: userId }: Pick<SelectUser, "id">) => {
    return jwt.sign({
        sub: userId,
    },
        env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: env.REFRESH_TOKEN_EXPIRY,
            issuer: "myapp-api",
            audience: "myapp-client",
        })
}



/**
 * func that returns tokens  
 */

export const generateTokenPair = (user: Pick<SelectUser, "id" | "role">) => {
    return {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
    }
}

export const verifyRefreshToken = (token: string): JwtPayload => {

    // verify takes string token ,decodes it, and returns the original object payload back
    return jwt.verify(
        token,
        env.REFRESH_TOKEN_SECRET,
        {
            issuer: 'myapp-api',
            audience: 'myapp-client'
        }) as JwtPayload
}

// verifies the token using given secret token to get a decoded token , it verifies sign and expiry ,if sign is not valid then throws error , if expired then throws error
export const verifyAccessToken = (accessToken: string): JwtPayload => {

    return jwt.verify(
        accessToken,
        env.ACCESS_TOKEN_SECRET,
        {
            issuer: 'myapp-api',
            audience: 'myapp-client'
        }
    ) as JwtPayload  // as type assertion tells compiler  to treat return types as JwtPayload (compile time only)

}