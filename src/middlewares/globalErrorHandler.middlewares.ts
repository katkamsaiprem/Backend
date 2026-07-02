
import { isDevelopment } from "@/config/env.js";
import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/types/index.js";


export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        // isOperational = true means this is a known, expected error (like 404 or 400)
        // isOperational = false means it's an unexpected programming error
        this.isOperational = true;
        // Capture the stack trace for clean error reporting
        Error.captureStackTrace(this, this.constructor);
    }
}

// The global error handler middleware.
// Express identifies it as an error handler because it has 4 parameters.
// The first parameter MUST be named `err` and typed as Error.
export const globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response<ApiResponse>,
    _next: NextFunction
): void => {
    // Log the error  in production you would send this to a logging service
    console.error(`ERROR ${req.method} ${req.path}:`, err);

    // Handle known AppErrors (ones we threw intentionally)
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
        return;
    }

    // Handle database unique constraint violations
    if (err.message.includes("unique constraint")) {
        res.status(409).json({
            success: false,
            error: "A record with this value already exists",
        });
        return;
    }

    // For unknown errors, hide the details in production (security)
    // but show them in development (debugging)
    res.status(500).json({
        success: false,
        error: isDevelopment ? err.message : "An unexpected error occurred",
        ...(isDevelopment && { stack: err.stack }),
    });
}