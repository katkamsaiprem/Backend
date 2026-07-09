import { db } from "../db/index.js";
import { categories, InsertCategory } from "../db/schema/categories.schema.js";
import { eq } from "drizzle-orm";
import { CreateCategoryInput, BulkCreateCategoriesInput } from "./categories.schema.zod.js";



export const getAllCategoriesRepository = async () => {
    return db.select().from(categories);
};

export const getCategoryByIdRepository = async (id: string) => {
    const [category] = await db
        .select()
        .from(categories)
        .where(eq(categories._id, id));

    return category;
};



export const createCategoryRepository = async (data: CreateCategoryInput) => {
    const insertData: InsertCategory = data;

    const [category] = await db
        .insert(categories)
        .values(insertData)
        .returning();

    return category;
};

export const bulkCreateCategoriesRepository = async (data: BulkCreateCategoriesInput) => {
    const insertData: InsertCategory[] = data;

    return db
        .insert(categories)
        .values(insertData)
        .onConflictDoNothing({ target: categories._id })
        .returning();
};
