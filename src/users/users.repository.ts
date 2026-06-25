import { db } from "@/db/index.js"
import { InsertUser, users } from "@/db/schema/users.schema.js"

export const createUserRepository = async (payload: InsertUser) => {

    const [user] = await db.insert(users).values(payload).returning()

    return user;
}