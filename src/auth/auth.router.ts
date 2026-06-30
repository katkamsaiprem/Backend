import { Router } from "express";
import { getMeController, loginController, logoutController, refreshController, registerController } from "./auth.controller.js";
import { authenticate } from "@/middlewares/authenthicate.middleware.js";
import { authRateLimiter, generalRateLimiter } from "@/middlewares/reateLimiter.middleware.js";


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
authRouter.post("/logout", generalRateLimiter, authenticate, logoutController)
authRouter.get("/me", generalRateLimiter, authenticate, getMeController)

export default authRouter;



//TODO
/**
 *  login router
 * - 
 */