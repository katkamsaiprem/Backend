import { Request, Response } from "express";
import { ApiResponse } from "../types/index.js";
import { createWishlistSchema, deleteWishlistSchema } from "./wishlist.schema.zod.js";
import { AppError } from "../middlewares/globalErrorHandler.middlewares.js";
import * as wishlistService from "./wishlist.service.js"

export const createWishlistController = async (req: Request, res: Response<ApiResponse>): Promise<void> => {

    const parseResult = createWishlistSchema.safeParse({ body: req.body });
    if (!parseResult.success) {
        throw new AppError(parseResult.error.issues.map(e => e.message).join(", "), 400);
    }
    const validatedBody = parseResult.data.body;
    const response = await wishlistService.createWishlist(validatedBody);


    res.status(201).json({
        success: true,
        data: response,
        message: "Successfully wishlisted given item"
    })





}

export const deleteWhishListController = async (req: Request, res: Response<ApiResponse>): Promise<void> => {

    const parseResult = deleteWishlistSchema.safeParse({ params: req.params })//make sure the readable data is correct and safe before using it 

    if (!parseResult.success) {
        throw new AppError(parseResult.error.issues.map(e => e.message).join(","), 400);

    }

    const validatedParams = parseResult.data.params;

    const deletedItem = await wishlistService.deleteWishlist(validatedParams)

    res.status(200).json({
        success: true,
        data: deletedItem,
        message: "Successfully removed item form wishlist"
    })
}


export const getWishlistController = async (_req: Request, res: Response<ApiResponse>): Promise<void> => {
    
    const items = await wishlistService.getAllWishlistItems();

    res.status(200).json({
        success: true,
        data: items,
        message: "Successfully fetched all wishlist items"
    });
}