
/**
 * create users table 
 * - with columns id , name, gmail, bio, isActive, createdAt, updatedAt ,add unique index on gmail 
 *
 */

import { boolean, pgEnum, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core"

export const userRoleEnum = pgEnum("user_role", ["user", "admin", "moderater"])

export const users = pgTable("users", {

    //---------colName--rule---
    id: serial().primaryKey(),
    username: varchar({ length: 50 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    // Email verification flow
    isEmailVerified: boolean().default(false).notNull(),
    // Store refreshToken as Hash ,so even the db is breached , attacker cannot understand the bcrypt hash , they get only gibberish text ,they cant do anything withit
    refreshTokenHash: text(),
    // Store the timeStamp of refreshTokenIssuedAt : to track it , and used  for rotation invalidaation after 7 days or 30 days
    issuedRefreshTokenAt: timestamp({ withTimezone: true }),
    // role for authorization 
    role: userRoleEnum().default("user").notNull(),
    passwordHash: text().notNull(),
    isActive: boolean().notNull().default(true),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow()
},
    (users) => [
        //third argu is optional
        // mostly used for table level rules and indexes
        uniqueIndex("users_email_unique_idx").on(users.email),
        uniqueIndex("users_username_unique_idx").on(users.username)
    ]
)


//automatic ts types creation based on schema using drizzle
export type SelectUser = typeof users.$inferSelect;

export type InsertUser = typeof users.$inferInsert;


