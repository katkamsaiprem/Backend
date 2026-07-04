import { Router } from "express";
import { createWhishlistController, deleteWhishListController, getWhishlistController } from "./whishlist.controller.js";



export const whishlistRouter = Router();

whishlistRouter.post("/", createWhishlistController);
whishlistRouter.delete("/:id", deleteWhishListController);
whishlistRouter.get("/", getWhishlistController);
