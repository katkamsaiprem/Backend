import { Router } from "express";
import {
    createVenueController,
    bulkCreateVenuesController,
    getVenuesController,
    getVenueByIdController,
} from "./venues.controller.js";



const venueRouter = Router();

venueRouter.post("/", createVenueController);
venueRouter.post("/bulk", bulkCreateVenuesController);
venueRouter.get("/", getVenuesController);    ///api/v1/venues  (?sport=Cricket)
venueRouter.get("/:id", getVenueByIdController);



export default venueRouter;
