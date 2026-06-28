//TODO
// code related to Sign , verify , decode tokens

import jwt from "jsonwebtoken";
import { InsertUser } from "@/db/schema/users.schema.js";
import { env } from "@/config/env.js";


// this token travels with every request
export const generateAccessToken = ({ id: userId, role }: Pick<InsertUser, "id" | "role">) => {

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
export const generateRefreshToken = ({ id: userId }: Pick<InsertUser, "id">) => {
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

export const generateTokenPair = (user: Pick<InsertUser, "id" | "role">) => {
    return {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
    }
}