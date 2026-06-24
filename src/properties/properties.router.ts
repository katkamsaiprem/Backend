import { Router } from "express";
import { createPropertyController, getPropertiesController } from "./properties.controller.js";



const router = Router()// instead of using app.use directly we can use this to group our routes


router.post("/", createPropertyController)
router.get("/", getPropertiesController)


export default router