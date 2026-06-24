import { Request, Response } from "express"
import { categoriesService, createPropertyService, getAllPropertiesService, getPropertyByIdService } from "./properties.service.js"
import { InsertProperty } from "@/db/schema/properties.schema.js"
import { AppError } from "@/middlewares/globalErrorHandler.js"




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


export const getPropertiesController = async (req: Request, res: Response): Promise<void> => {

    const { category } = req.query // ?category=villa
    const properties = category ? await categoriesService(category as string) : await getAllPropertiesService()



    res.status(200).json({
        success: true,
        data: properties,
        message: "successfully fetched all properties"
    })

}


export const getPropertyByIdController = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params

    const property = await getPropertyByIdService(Number(id))
    console.log(property);


    if (!property) {
        throw new AppError("Property not Found with given Id", 404)
    }
    res.status(200).json({
        success: true,
        data: property,
        message: "Property fetched successfully"
    })

}