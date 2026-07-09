import {
    getAllCategoriesRepository,
    getCategoryByIdRepository,
    createCategoryRepository,
    bulkCreateCategoriesRepository,
} from "./categories.repository.js";
import { CreateCategoryInput, BulkCreateCategoriesInput } from "./categories.schema.zod.js";




export const getAllCategoriesService = async () => {
    return getAllCategoriesRepository();
};

export const getCategoryByIdService = async (id: string) => {
    return getCategoryByIdRepository(id);
};



export const createCategoryService = async (dto: CreateCategoryInput) => {
    return createCategoryRepository(dto);
};

export const bulkCreateCategoriesService = async (data: BulkCreateCategoriesInput) => {
    return bulkCreateCategoriesRepository(data);
};
