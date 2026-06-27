import { db } from "@/db/index.js"
import { InsertUser, users } from "@/db/schema/users.schema.js"
import { eq, ilike, or } from "drizzle-orm";

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


export const createUser = async ({ email, username, passwordHash }: Pick<InsertUser, "email" | "username" | "passwordHash">) => {

    const [userCreated] = await db.insert(users).values({ email, username, passwordHash }).returning(); // returing returns all columns of created user (fields)
    return userCreated;
}