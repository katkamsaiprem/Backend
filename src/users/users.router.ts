import { Router } from "express";
import { signUpController } from "./users.controller.js";


const usersRouter = Router();

usersRouter.post("/", signUpController)

export default usersRouter;