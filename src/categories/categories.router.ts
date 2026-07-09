import { Router } from "express";
import {
    getAllCategoriesController,
    getCategoryByIdController,
    createCategoryController,
    bulkCreateCategoriesController,
} from "./categories.controller.js";



const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategoriesController);
categoriesRouter.get("/:id", getCategoryByIdController);

categoriesRouter.post("/", createCategoryController);


categoriesRouter.post("/bulk", bulkCreateCategoriesController);



export default categoriesRouter;
