import {
    boolean,
    index,
    integer,
    numeric,
    pgTable,
    serial,
    smallint,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";



export const venues = pgTable("venues", {

    id: serial().primaryKey(),

    // business level identifier like v001, v002 etc
    venueId: varchar({ length: 20 }).notNull().unique(),

    name: varchar({ length: 150 }).notNull(),

    sport: varchar({ length: 100 }).notNull(),

    image: text().notNull(),

    address: varchar({ length: 200 }).notNull(),

    city: varchar({ length: 100 }).notNull(),

    state: varchar({ length: 100 }).notNull(),


    rating: numeric({ precision: 3, scale: 1 }).notNull(),


    pricePerHour: integer().notNull(),


    capacity: integer().notNull(),

    numberOfCourts: smallint().notNull(),


    courtType: varchar({ length: 100 }).notNull(),


    amenities: text().array().notNull(),

    isCancelable: boolean().notNull(),

    venueOwner: varchar({ length: 100 }).notNull(),


    ownerJoinedOn: varchar({ length: 30 }).notNull(),

    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),

    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),

},
    (venues) => [
        index("idx_venue_sport").on(venues.sport),
        index("idx_venue_city").on(venues.city),
        index("idx_venue_rating").on(venues.rating),
        index("idx_venue_price_per_hour").on(venues.pricePerHour),
        index("idx_venue_court_type").on(venues.courtType),
    ]
)


// Automatic TypeScript types inferred from the schema
export type SelectVenue = typeof venues.$inferSelect;

export type InsertVenue = typeof venues.$inferInsert;
