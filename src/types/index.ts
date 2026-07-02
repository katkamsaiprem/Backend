import { z } from 'zod'

// user validation schema 

import type { SelectUser } from '@/db/schema/users.schema.js' // to know what types db is expecting


// set rules to rgisterInputs
export const registerSchema = z.object({
    body: z.object({
        username: z
            .string({ error: "username is required" })
            .min(2, "Username must be at least 2 characters")
            .max(50, "Username cannot exceed 50 characters")
            .trim(),
        email: z
            .string({ error: "Email is required" })
            .email({ error: "Must be valid email" })
            .max(255, { error: "Email cannot exceed 255 characters" })
            .toLowerCase() // to prevent duplicate acc by ensuring Test@email and test@email are same in db
            .trim(),
        password: z
            .string({ error: "Password is required" })
            .min(8, { error: "Password must be least 8 characters" })
            .max(100, { error: "Password cannnot exceed 100 characters" })
    })


})

// rules for login inputs
export const loginSchema = z.object({
    body: z.object({
        email: z
            .string({ error: "Email is required" })
            .email({ error: "Must be valid email" })
            .toLowerCase()
            .trim(),
        password: z
            .string({ error: "Password is required" })
            .min(1, { error: "Password is required" })

    })
})

// take(inferred) types from zod schema

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"]


// API response types

export type ApiResponse<T = any> = { // any is default type ,so we if not providing type ,it take type any
    success: boolean;
    data?: T;
    message?: string;
    error?: string;


}

export type { SelectUser }