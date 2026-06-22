import { InsertProperty } from "@/db/schema/properties.schema.js"
import { createPropertyRepository } from "./properties.repository.js"




export const createServiceProperty = async (dto: InsertProperty) => {

    //validation

    //inserting data into db
    return createPropertyRepository(dto)
    //error handling

    //returning response


}