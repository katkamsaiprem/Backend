import { InsertUser } from "@/db/schema/users.schema.js"
import { createUserRepository } from "./users.repository.js"

export const createUserService = async (payload: InsertUser) => {

    return await createUserRepository(payload)


}