import { z } from "zod";


// Validation rules for user registration

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
            .toLowerCase() // prevents duplicate accounts like Sai@email === sai@email in DB
            .trim(),
        password: z
            .string({ error: "Password is required" })
            .min(8, { error: "Password must be least 8 characters" })
            .max(100, { error: "Password cannnot exceed 100 characters" }),
    }),
});


// Validation rules for user login

export const loginSchema = z.object({
    body: z.object({
        email: z
            .string({ error: "Email is required" })
            .email({ error: "Must be valid email" })
            .toLowerCase()
            .trim(),
        password: z
            .string({ error: "Password is required" })
            .min(1, { error: "Password is required" }),
    }),
});


// Let TypeScript infer types automatically from our Zod schemas

export type RegisterInput = z.infer<typeof registerSchema>["body"];

export type LoginInput = z.infer<typeof loginSchema>["body"];
