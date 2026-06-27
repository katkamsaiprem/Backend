import { Router } from "express";
import { registerController } from "./auth.controller.js";


const authRouter = Router();

//TODO
/**
 * add ratelimiter
 * add input validatiion using zod
 * 
 */

authRouter.post("/register", registerController)

export default authRouter;