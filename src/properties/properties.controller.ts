import { NextFunction, Request, Response } from "express"
import { createServiceProperty } from "./properties.service.js"

export const getAllproperties = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

    }
    catch (err) {

    }
}

export const createProperty = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        // validate data

        //send data to controller
        const property = await createServiceProperty(_req.body)

        //send response to express
        res.status(201).json({
            status: 'success',
            data: {
                property
            }
        })

    }
    catch (err) {
        next(err)
    }
}