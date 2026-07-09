import { z } from "zod";


export const createCategorySchema = z.object({
    body: z.object({
        _id: z.string().min(1, "_id is required"),
        sport: z.string().min(1, "sport is required"),
        icon: z.string().min(1, "icon is required"),
    }),
});


export const bulkCreateCategoriesSchema = z.object({
    body: z.object({
        categories: z.array(
            z.object({
                _id: z.string().min(1, "_id is required"),
                sport: z.string().min(1, "sport is required"),
                icon: z.string().min(1, "icon is required"),
            })
        ).min(1, "At least one category is required"),
    }),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>["body"];
export type BulkCreateCategoriesInput = z.infer<typeof bulkCreateCategoriesSchema>["body"]["categories"];
