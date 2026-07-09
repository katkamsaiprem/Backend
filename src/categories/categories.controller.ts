import { Request, Response } from "express";
import { ApiResponse } from "../types/index.js";
import { AppError } from "../middlewares/globalErrorHandler.middlewares.js";
import {
    createCategorySchema,
    bulkCreateCategoriesSchema,
} from "./categories.schema.zod.js";
import {
    getAllCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    bulkCreateCategoriesService,
} from "./categories.service.js";



export const getAllCategoriesController = async (
    _req: Request,
    res: Response<ApiResponse>
): Promise<void> => {

    const categories = await getAllCategoriesService();

    res.status(200).json({
        success: true,
        data: categories,
        message: "Categories fetched successfully",
    });

};


export const getCategoryByIdController = async (
    req: Request,
    res: Response<ApiResponse>
): Promise<void> => {

    const id = req.params["id"] as string;

    if (!id) {
        throw new AppError("Category id is required", 400);
    }

    const category = await getCategoryByIdService(id);

    if (!category) {
        throw new AppError("Category not found with given id", 404);
    }

    res.status(200).json({
        success: true,
        data: category,
        message: "Category fetched successfully",
    });

};


export const createCategoryController = async (
    req: Request,
    res: Response<ApiResponse>
): Promise<void> => {

    const parseResult = createCategorySchema.safeParse({ body: req.body });
    if (!parseResult.success) {
        throw new AppError(
            parseResult.error.issues.map((e) => e.message).join(", "),
            400
        );
    }

    const category = await createCategoryService(parseResult.data.body);

    res.status(201).json({
        success: true,
        data: category,
        message: "Category created successfully",
    });

};


export const bulkCreateCategoriesController = async (
    req: Request,
    res: Response<ApiResponse>
): Promise<void> => {

    const parseResult = bulkCreateCategoriesSchema.safeParse({ body: req.body });
    if (!parseResult.success) {
        throw new AppError(
            parseResult.error.issues.map((e) => e.message).join(", "),
            400
        );
    }

    const { categories } = parseResult.data.body;
    const result = await bulkCreateCategoriesService(categories);

    res.status(201).json({
        success: true,
        data: result,
        message: `${result.length} categor${result.length === 1 ? "y" : "ies"} created successfully`,
    });

};
