import { index, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {

    id: serial().primaryKey(),


    // explicit name "_id" prevents snake_case casing from stripping the underscore
    _id: varchar("_id", { length: 20 }).notNull().unique(),

    sport: varchar({ length: 100 }).notNull(),

    icon: varchar({ length: 100 }).notNull(),

},
    (categories) => [
        index("idx_category_sport").on(categories.sport),
    ]
);

export type SelectCategory = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
