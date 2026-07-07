import { z } from "zod";




export const createWhishlistSchema = z.object({
    body: z.object({
        whishlistedItemId: z
            .string({ error: "WhishlistedItemId is required" })
            .trim(),
    }),
});



export const deleteWhishlistSchema = z.object({
    params: z.object({
        id: z
            .string({ error: "Id is required" })
            .trim(),
    }),
});




export type CreateWhishlistInput = z.infer<typeof createWhishlistSchema>["body"];

export type DeleteWhishlistInput = z.infer<typeof deleteWhishlistSchema>["params"];
