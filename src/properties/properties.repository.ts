import { db } from "@/db/index.js"
import { InsertProperty, properties } from "@/db/schema/properties.schema.js"




export const createPropertyRepository = async (data: InsertProperty) => {

    try {
        const [property] = await db
            .insert(properties)
            .values(data)
            .returning();

        return property;
    }
    catch (error) {
        console.log("Error in createPropertyRepository", error);
        throw error;
    }


}