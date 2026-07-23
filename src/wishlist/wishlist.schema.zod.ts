import { z } from "zod";




export const createWishlistSchema = z.object({
    body: z.object({
        wishlistedItemId: z
            .string({ error: "WishlistedItemId is required" })
            .trim(),
    }),
});



export const deleteWishlistSchema = z.object({
    params: z.object({
        id: z
            .string({ error: "Id is required" })
            .trim(),
    }),
});




export type CreateWishlistInput = z.infer<typeof createWishlistSchema>["body"];

export type DeleteWishlistInput = z.infer<typeof deleteWishlistSchema>["params"];
