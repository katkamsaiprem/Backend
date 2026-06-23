import { Request, Response } from "express"
import { createPropertyService } from "./properties.service.js"
import { InsertProperty } from "@/db/schema/properties.schema.js"




export const createPropertyController = async (req: Request, res: Response): Promise<void> => {

    //TODO 
    //implement ZOD
    // validate data or safety check




    const input = req.body as InsertProperty // remove this type casting after implementing ZOD

    //send data to service
    const property = await createPropertyService(input)

    //send response to express
    res.status(201).json({
        success: true,
        data: property,
        message: "property created successfully"

    })


}


export const getAllPropertiesController = async (_req: Request, res: Response): Promise<void> => {



}