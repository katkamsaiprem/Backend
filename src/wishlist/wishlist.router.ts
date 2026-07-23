import { Router } from "express";
import { createWishlistController, deleteWhishListController, getWishlistController } from "./wishlist.controller.js";



export const wishlistRouter = Router();

wishlistRouter.post("/", createWishlistController);
wishlistRouter.delete("/:id", deleteWhishListController);
wishlistRouter.get("/", getWishlistController);
