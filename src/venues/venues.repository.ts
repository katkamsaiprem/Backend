import { db } from "../db/index.js";
import { InsertVenue, venues } from "../db/schema/venues.schema.js";
import { eq, gte, lte, ilike, and, SQL, count } from "drizzle-orm";
import { GetVenuesQueryInput } from "./venues.schema.zod.js";



export const createVenueRepository = async (data: InsertVenue) => {

    const [venue] = await db
        .insert(venues)
        .values(data)
        .returning();

    return venue;

}


export const insertManyVenuesRepository = async (data: InsertVenue[]) => {

    return db.insert(venues).values(data).onConflictDoNothing({ target: venues.venueId }).returning();

}


export const getFilteredVenuesRepository = async (filters: GetVenuesQueryInput) => {

    const {
        sport,
        name,
        minPrice,
        maxPrice,
        capacity,
        numberOfCourts,
        courtType,
        minRating,
        isCancelable,
        page,
        limit,
    } = filters;

    // Build WHERE conditions dynamically , only add a condition if the param was provided
    const conditions: SQL[] = [];

    //if this filter is provided by user then add it in conditions array
    if (sport) conditions.push(eq(venues.sport, sport));
    if (courtType) conditions.push(eq(venues.courtType, courtType));
    if (isCancelable !== undefined) conditions.push(eq(venues.isCancelable, isCancelable));
    if (minPrice !== undefined) conditions.push(gte(venues.pricePerHour, minPrice));
    if (maxPrice !== undefined) conditions.push(lte(venues.pricePerHour, maxPrice));
    if (capacity !== undefined) conditions.push(gte(venues.capacity, capacity));
    if (numberOfCourts !== undefined) conditions.push(gte(venues.numberOfCourts, numberOfCourts));
    if (minRating !== undefined) conditions.push(gte(venues.rating, String(minRating)));
    if (name) conditions.push(ilike(venues.name, `%${name}%`));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const offset = (page - 1) * limit;

    // Run data query and count query in parallel
    const [data, [{ total }]] = await Promise.all([
        db
            .select()
            .from(venues)
            .where(whereClause)
            .limit(limit)
            .offset(offset),

        db
            .select({ total: count() })
            .from(venues)
            .where(whereClause),
    ]);

    return { venues: data, total };

}


export const getVenueByIdRepository = async (id: number) => {

    const [venue] = await db.select().from(venues).where(eq(venues.id, id));

    return venue;

}

