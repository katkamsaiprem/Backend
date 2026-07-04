import { index, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const whishlist = pgTable("whishlist", {
    id: serial().primaryKey(),
    whishlistedItemId: varchar({ length: 100 }).notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
},
    (whishlist) => [
        index("idx_whishlist_itemId").on(whishlist.whishlistedItemId)
    ]
)

export type SelectWhishlist = typeof whishlist.$inferSelect;
export type InsertWhishlist = typeof whishlist.$inferInsert;