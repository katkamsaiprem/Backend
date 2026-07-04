import { Request, Response } from "express";
import { ApiResponse, createWhishlistSchema, deleteWhishlistSchema } from "../types/index.js";
import { AppError } from "../middlewares/globalErrorHandler.middlewares.js";
import * as whishlistService from "./whishlist.service.js"

export const createWhishlistController = async (req: Request, res: Response<ApiResponse>): Promise<void> => {

    const parseResult = createWhishlistSchema.safeParse({ body: req.body });
    if (!parseResult.success) {
        throw new AppError(parseResult.error.issues.map(e => e.message).join(", "), 400);
    }
    const validatedBody = parseResult.data.body;
    const response = await whishlistService.createWhishlist(validatedBody);


    res.status(201).json({
        success: true,
        data: response,
        message: "Successfully whishlisted given item"
    })





}

export const deleteWhishListController = async (req: Request, res: Response<ApiResponse>): Promise<void> => {

    const parseResult = deleteWhishlistSchema.safeParse({ params: req.params })//make sure the readable data is correct and safe before using it 

    if (!parseResult.success) {
        throw new AppError(parseResult.error.issues.map(e => e.message).join(","), 400);

    }

    const validatedParams = parseResult.data.params;

    const deletedItem = await whishlistService.deleteWhishlist(validatedParams)

    res.status(200).json({
        success: true,
        data: deletedItem,
        message: "Successfully removed item form whishlist"
    })
}


export const getWhishlistController = async (_req: Request, res: Response<ApiResponse>): Promise<void> => {
    
    const items = await whishlistService.getAllWhishlistItems();

    res.status(200).json({
        success: true,
        data: items,
        message: "Successfully fetched all whishlist items"
    });
}