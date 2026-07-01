import { Router } from "express";
import { getMeController, loginController, logoutController, refreshController, registerController } from "./auth.controller.js";
import { authenticate } from "@/middlewares/authenthicate.middleware.js";
import { authRateLimiter } from "@/middlewares/reateLimiter.middleware.js";


const authRouter = Router();

//TODO
/**
 * add ratelimiter
 * add input validatiion using zod
 * 
 */

// Public routes does not need authentication
authRouter.post("/register", authRateLimiter, registerController)
authRouter.post("/login", authRateLimiter, loginController)
authRouter.post("/refresh", authRateLimiter, refreshController)

// Protected route 
authRouter.post("/logout", authenticate, logoutController)
authRouter.get("/me", authenticate, getMeController)

export default authRouter;



//TODO
/**
 *  login router
 * - 
 */