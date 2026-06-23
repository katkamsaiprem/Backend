import { db } from "@/db/index.js"
import { InsertProperty, properties } from "@/db/schema/properties.schema.js"




export const createPropertyRepository = async (data: InsertProperty) => {


    const [property] = await db
        .insert(properties)
        .values(data)
        .returning();

    return property;



}

