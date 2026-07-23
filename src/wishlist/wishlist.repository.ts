import { db } from "../db/index.js";
import { wishlist } from "../db/schema/wishlist.schema.js";
import { eq } from "drizzle-orm";


export const createWhishListItem = async (wishlistedItemId: string) => {

    const [savedWishlist] = await db.insert(wishlist).values({
        wishlistedItemId
    }).returning();

    return savedWishlist;



}

export const deleteWishlistItem = async (id: string) => {

    const [deletedItem] = await db.delete(wishlist).where(eq(wishlist.wishlistedItemId, id)).returning()

    return deletedItem;

}

export const getWishlistItems = async () => {

    const items = await db.select().from(wishlist);

    return items;

}