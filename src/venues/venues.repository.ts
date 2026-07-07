import { db } from "../db/index.js";
import { InsertVenue, venues } from "../db/schema/venues.schema.js";
import { eq } from "drizzle-orm";



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


export const getAllVenuesRepository = async () => {

    return db.select().from(venues);

}


export const getVenueBySportRepository = async (sport: string) => {

    return db.select().from(venues).where(eq(venues.sport, sport));

}


export const getVenueByIdRepository = async (id: number) => {

    const [venue] = await db.select().from(venues).where(eq(venues.id, id));

    return venue;

}
