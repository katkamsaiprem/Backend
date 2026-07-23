import { index, pgTable, serial, timestamp, varchar, integer } from "drizzle-orm/pg-core";

export const wishlist = pgTable("wishlist", {
    id: serial().primaryKey(),
    userId: integer().default(1).notNull(),
    wishlistedItemId: varchar({ length: 100 }).notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
},
    (wishlist) => [
        index("idx_wishlist_userId").on(wishlist.userId),
        index("idx_wishlist_itemId").on(wishlist.wishlistedItemId)
    ]
)

export type SelectWishlist = typeof wishlist.$inferSelect;
export type InsertWishlist = typeof wishlist.$inferInsert;