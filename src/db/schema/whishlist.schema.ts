import { index, pgTable, serial, timestamp, varchar, integer } from "drizzle-orm/pg-core";

export const whishlist = pgTable("whishlist", {
    id: serial().primaryKey(),
    userId: integer().default(1).notNull(),
    whishlistedItemId: varchar({ length: 100 }).notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
},
    (whishlist) => [
        index("idx_whishlist_userId").on(whishlist.userId),
        index("idx_whishlist_itemId").on(whishlist.whishlistedItemId)
    ]
)

export type SelectWhishlist = typeof whishlist.$inferSelect;
export type InsertWhishlist = typeof whishlist.$inferInsert;