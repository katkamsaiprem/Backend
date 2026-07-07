import { InsertVenue } from "../db/schema/venues.schema.js";
import {
    createVenueRepository,
    getAllVenuesRepository,
    getVenueBySportRepository,
    getVenueByIdRepository,
    insertManyVenuesRepository,
} from "./venues.repository.js";
import { CreateVenueInput, BulkCreateVenuesInput } from "./venues.schema.zod.js";


// Create a new venue
// rating comes from Zod as a number, but Drizzle numeric column needs a string format.
export const createVenueService = async (dto: CreateVenueInput) => {


    const insertData: InsertVenue = {
        ...dto,
        rating: String(dto.rating),
    };

    return createVenueRepository(insertData);

}


// Insert multiple venues at once

export const bulkInsertVenuesService = async (data: BulkCreateVenuesInput) => {

    // convert rating numbers to strings for the db
    const insertData: InsertVenue[] = data.map(venue => ({
        ...venue,
        rating: String(venue.rating),
    }));

    return insertManyVenuesRepository(insertData);

}


// Fetch all venues

export const getAllVenuesService = async () => {

    return getAllVenuesRepository();

}


export const getVenueBySportService = async (sport: string) => {

    return getVenueBySportRepository(sport);

}


export const getVenueByIdService = async (id: number) => {

    return getVenueByIdRepository(id);

}
