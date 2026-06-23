import { Router } from "express";
import { createPropertyController, getAllPropertiesController } from "./properties.controller.js";



const router = Router()// instead of using app.use directly we can use this to group our routes

// router.get("/", getAllproperties)

router.post("/", createPropertyController)
router.get("/", getAllPropertiesController)


export default router