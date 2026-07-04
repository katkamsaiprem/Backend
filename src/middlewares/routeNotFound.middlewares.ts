
import type { Request, Response } from "express";
import { ApiResponse } from "../types/index.js";

export function notFoundHandler(req: Request, res: Response<ApiResponse>): void {
    res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.originalUrl} not found`,
    });
}