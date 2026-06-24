import { Router } from "express";
import { createPropertyController, getPropertiesController, getPropertyByIdController } from "./properties.controller.js";



const router = Router()// instead of using app.use directly we can use this to group our routes


router.post("/", createPropertyController)
router.get("/", getPropertiesController)
router.get("/:id", getPropertyByIdController)

//TODO
//single hotel router

export default router