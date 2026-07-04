import { db } from "../db/index.js";
import { whishlist } from "../db/schema/whishlist.schema.js";
import { eq } from "drizzle-orm";


export const createWhishListItem = async (whishlistedItemId: string) => {

    const [savedWhishlist] = await db.insert(whishlist).values({
        whishlistedItemId
    }).returning();

    return savedWhishlist;



}

export const deleteWhishlistItem = async (id: string) => {

    const [deletedItem] = await db.delete(whishlist).where(eq(whishlist.whishlistedItemId, id)).returning()

    return deletedItem;

}

export const getWhishlistItems = async () => {

    const items = await db.select().from(whishlist);

    return items;

}