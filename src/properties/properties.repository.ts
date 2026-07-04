import { db } from "../db/index.js"
import { InsertProperty, properties } from "../db/schema/properties.schema.js"
import { eq } from "drizzle-orm";




export const createPropertyRepository = async (data: InsertProperty) => {


    const [property] = await db
        .insert(properties)
        .values(data)
        .returning();

    return property;



}

export const getAllPropertiesRepository = async () => {

    return db.select().from(properties)
}

export const categoriesRepository = async (category: string) => {


    return await db.select().from(properties).where(eq(properties.category, category))


}


export const getPropertyByIdRepository = async (id: Number) => {


    const [property] = await db.select().from(properties).where(eq(properties.id, Number(id))) //db.select() always returns an array 

    return property;

}