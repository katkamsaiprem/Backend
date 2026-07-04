import { db } from "../db/index.js"
import { InsertUser, SelectUser, users } from "../db/schema/users.schema.js"
import { and, eq, ilike, or } from "drizzle-orm";

export const createUserRepository = async (payload: InsertUser) => {

    const [user] = await db.insert(users).values(payload).returning()

    return user;
}


/**
 * find if userName or gmail is exist or not , used during registration of new user
 *  if no then return null , else user 
 * 
 */

// think pick is a box and it contains selected properties from InsertUser 
// From InsertUser , pick set of properties whose keys are in union("|") of InsertUser 
export const findUserByEmailOrUserNameRepository = async ({ email, username }: Pick<InsertUser, "email" | "username">) => {

    // eq does case sensitive Sai does not equal sai , ilke does case insesitive check prem equals Prem 
    const result = await db.select().from(users).where(or(eq(users.email, email.toLowerCase()), ilike(users.username, username))) // Treat emails as lowercase because databases view "User" and "user" as two separate accounts.

    const existingUser = result[0] || null;

    return existingUser;
}



export const findUserByEmail = async ({ email }: Pick<SelectUser, "email">) => {

    const result = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase()));
    const existingUser = result[0] || null;

    return existingUser;
}

export const saveRefreshToken = async ({ id, refreshTokenHash }: Pick<SelectUser, "refreshTokenHash" | "id">) => {

    return await db.update(users).set({ refreshTokenHash, issuedRefreshTokenAt: new Date(), updatedAt: new Date() }).where(eq(users.id, Number(id)))
}


export const findUserById = async ({ id }: Pick<SelectUser, "id">) => {

    const result = await db.select().from(users).where(eq(users.id, id))

    return result[0] || null

}



// revoke refresh token by clearing it from the DB 
// called on logout
export const revokeRefreshToken = async ({ id }: Pick<SelectUser, "id">) => {
    await db.update(users).set({ refreshTokenHash: null, issuedRefreshTokenAt: null, updatedAt: new Date() }).where(eq(users.id, id))
}

export const rotateRefreshToken = async ({ id, oldRefreshTokenHash, newRefreshTokenHash }: { id: number, oldRefreshTokenHash: string, newRefreshTokenHash: string }) => {
    const result = await db.update(users)
        .set({ refreshTokenHash: newRefreshTokenHash, issuedRefreshTokenAt: new Date(), updatedAt: new Date() })
        .where(
            and(
                eq(users.id, id),
                eq(users.refreshTokenHash, oldRefreshTokenHash)
            )
        )
        .returning({ id: users.id });

    return result.length > 0;
}

