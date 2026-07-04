import { Router } from "express";
import { createPropertyController, getPropertiesController, getPropertyByIdController } from "./properties.controller.js";



const propertyRouter = Router()// instead of using app.use directly we can use this to group our routes


propertyRouter.post("/", createPropertyController)
propertyRouter.get("/", getPropertiesController)
propertyRouter.get("/:id", getPropertyByIdController)



export default propertyRouter