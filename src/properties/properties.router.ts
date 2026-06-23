import { Router } from "express";
import { createPropertyController } from "./properties.controller.js";



const router = Router()// instead of using app.use directly we can use this to group our routes

// router.get("/", getAllproperties)

router.post("/", createPropertyController)
// router.get("/", getAllProperties)


export default router