import { Router } from "express";
import { getAllproperties } from "./properties.repository.js";


const router = Router()// instead of using app.use directly we can use this to group our routes

router.get("/", getAllproperties)

export default router