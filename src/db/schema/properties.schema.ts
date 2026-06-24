import { boolean, index, numeric, pgTable, serial, smallint, text, timestamp, varchar } from "drizzle-orm/pg-core";




export const properties = pgTable("properties", {

    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    image: text("Image").notNull(),
    imageArr: text("imageArr").array().notNull(),
    address: varchar("address", { length: 100 }).notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    price: numeric("price", { precision: 50 }).notNull(),
    rating: smallint("rating").notNull(),
    numberOfBathrooms: smallint("numberOfBathrooms").notNull(),
    numberOfguest: smallint("numberOfguest").notNull(),
    numberOfBedrooms: smallint("numberOfBedrooms").notNull(),
    numberOfStudies: smallint("numberOfStudies").notNull(),
    hostName: varchar("hostName", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    amenties: text("amenties").array().notNull(),
    healthAndSafety: text("healthAndSafety").array().notNull(),
    houseRules: text("houseRules").array().notNull(),
    propertyType: varchar("propertyType").notNull(),
    isCancelable: boolean("is_cancelable").notNull()

},
    (properties) => [
        index("idx_city").on(properties.city),
        index("idx_country").on(properties.country),
        index("idx_category").on(properties.category),
        index("idx_propertyType").on(properties.propertyType),
        index("idx_price").on(properties.price),
        index("idx_rating").on(properties.rating),
        index("idx_createdAt").on(properties.createdAt),

    ]

)

//automatic ts types creation based on schema using drizzle
export type SelectProperty = typeof properties.$inferSelect;

export type InsertProperty = typeof properties.$inferInsert;
