import { InsertVenue } from "../db/schema/venues.schema.js";
import {
    createVenueRepository,
    getFilteredVenuesRepository,
    getVenueByIdRepository,
    insertManyVenuesRepository,
} from "./venues.repository.js";
import { CreateVenueInput, BulkCreateVenuesInput, GetVenuesQueryInput } from "./venues.schema.zod.js";


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


// Fetch venues with optional filters and pagination

export const getFilteredVenuesService = async (filters: GetVenuesQueryInput) => {

    return getFilteredVenuesRepository(filters);

}


export const getVenueByIdService = async (id: number) => {

    return getVenueByIdRepository(id);


}


