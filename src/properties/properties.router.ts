import { Router } from "express";
import { createProperty } from "./properties.controller.js";



const router = Router()// instead of using app.use directly we can use this to group our routes

// router.get("/", getAllproperties)

router.post("/", createProperty)


export default router