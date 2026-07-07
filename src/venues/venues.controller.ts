import { Request, Response } from "express";
import { ApiResponse } from "../types/index.js";
import {
    createVenueService,
    getAllVenuesService,
    getVenueBySportService,
    getVenueByIdService,
} from "./venues.service.js";
import { AppError } from "../middlewares/globalErrorHandler.middlewares.js";
import {
    createVenueSchema,
    bulkCreateVenuesSchema,
    getVenueByIdSchema,
    getVenuesBySportSchema,
} from "./venues.schema.zod.js";





export const createVenueController = async (
    req: Request,
    res: Response<ApiResponse>
): Promise<void> => {


    const parseResult = createVenueSchema.safeParse({ body: req.body });
    if (!parseResult.success) {
        throw new AppError(
            parseResult.error.issues.map((e) => e.message).join(", "),
            400
        );
    }

    const venue = await createVenueService(parseResult.data.body);

    res.status(201).json({
        success: true,
        data: venue,
        message: "Venue created successfully",
    });

}

// Handle multiple venue creation in one go

export const bulkCreateVenuesController = async (
    req: Request,
    res: Response<ApiResponse>
): Promise<void> => {

    const parseResult = bulkCreateVenuesSchema.safeParse({ body: req.body });
    if (!parseResult.success) {
        throw new AppError(
            parseResult.error.issues.map((e) => e.message).join(", "),
            400
        );
    }

    const { bulkInsertVenuesService } = await import("./venues.service.js");
    const venues = await bulkInsertVenuesService(parseResult.data.body);

    res.status(201).json({
        success: true,
        data: venues,
        message: "Venues bulk created successfully",
    });

}


// Fetch all venues, optionally filtered by sport type
export const getVenuesController = async (
    req: Request,
    res: Response<ApiResponse>
): Promise<void> => {


    const parseResult = getVenuesBySportSchema.safeParse({ query: req.query });
    if (!parseResult.success) {
        throw new AppError(
            parseResult.error.issues.map((e) => e.message).join(", "),
            400
        );
    }

    const { sport } = parseResult.data.query;

    const venues = sport
        ? await getVenueBySportService(sport)
        : await getAllVenuesService();

    res.status(200).json({
        success: true,
        data: venues,
        message: "Venues fetched successfully",
    });

}



export const getVenueByIdController = async (
    req: Request,
    res: Response<ApiResponse>
): Promise<void> => {

   
    const parseResult = getVenueByIdSchema.safeParse({ params: req.params });
    if (!parseResult.success) {
        throw new AppError(
            parseResult.error.issues.map((e) => e.message).join(", "),
            400
        );
    }

    const { id } = parseResult.data.params;

    const venue = await getVenueByIdService(Number(id));

    if (!venue) {
        throw new AppError("Venue not found with given id", 404);
    }

    res.status(200).json({
        success: true,
        data: venue,
        message: "Venue fetched successfully",
    });

}
