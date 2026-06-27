import { InsertProperty } from "@/db/schema/properties.schema.js"
import { categoriesRepository, createPropertyRepository, getAllPropertiesRepository, getPropertyByIdRepository } from "./properties.repository.js"
import { AppError } from "@/middlewares/globalErrorHandler.middlewares.js"




export const createPropertyService = async (dto: InsertProperty) => {

    //bussiness logic

    //RuleOne price must be positive and not free
    if (Number(dto.price) <= 0) {
        throw new AppError("Price must be positive number and not free ", 400)
    }
    //RuleTwo rating must be between 1 to 5
    if (dto.rating < 0 || dto.rating > 5) {
        throw new AppError("Rating must be betweeen 1 to 5", 400)
    }
    //RuleThree must have least 1 bedroom
    if (dto.numberOfBedrooms < 1) {
        throw new AppError("Must have at least 1 bedroom", 400)
    }


    //sanitizate the data before saving , sanitize only human typed text ,
    //to prevent comparison bugs, to save clean db records , to get correct search and filter results
    const sanitizedDto = {
        ...dto,
        name: dto.name.trim(),
        category: dto.category.trim(),
        address: dto.address.trim(),
        city: dto.city.trim(),
        state: dto.state.trim(),
        country: dto.country.trim(),
        hostName: dto.hostName.trim(),
        propertyType: dto.propertyType.trim(),

    }

    //inserting data into db
    return createPropertyRepository(sanitizedDto)





}

export const getAllPropertiesService = async () => {

    return await getAllPropertiesRepository()
}

export const categoriesService = async (category: string) => {

    return await categoriesRepository(category)
}

export const getPropertyByIdService = async (id: Number) => {

    return await getPropertyByIdRepository(id)

}