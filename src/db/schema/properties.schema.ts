import { boolean, index, numeric, pgTable, serial, smallint, text, timestamp, varchar } from "drizzle-orm/pg-core";




export const properties = pgTable("properties", {

    id: serial().primaryKey(),
    name: varchar({ length: 100 }).notNull(),
    category: varchar({ length: 100 }).notNull(),
    image: text().notNull(),
    imageArr: text().array().notNull(),
    address: varchar({ length: 100 }).notNull(),
    city: varchar({ length: 100 }).notNull(),
    state: varchar({ length: 100 }).notNull(),
    country: varchar({ length: 100 }).notNull(),
    price: numeric({ precision: 50 }).notNull(),
    rating: smallint().notNull(),
    numberOfBathrooms: smallint().notNull(),
    numberOfguest: smallint().notNull(),
    numberOfBedrooms: smallint().notNull(),
    numberOfStudies: smallint().notNull(),
    hostName: varchar({ length: 100 }).notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    amenties: text().array().notNull(),
    healthAndSafety: text().array().notNull(),
    houseRules: text().array().notNull(),
    propertyType: varchar().notNull(),
    isCancelable: boolean().notNull()

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
