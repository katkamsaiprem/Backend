// TODO
/**
 * create users table 
 * - with columns id , name, gmail, bio, isActive, createdAt, updatedAt ,add unique index on gmail 
 *
 */

import { boolean, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {

    //---------colName--rule---
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    bio: text("bio"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
},
    (users) => [
        //third argu is optional - mostly used for table level rules and indexes
        uniqueIndex("users_email_unique_idx").on(users.email),

    ]
)
