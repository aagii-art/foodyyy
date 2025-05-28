import express from "express";
import { createFood, getCategories, getFoodsByCategory } from "../controllers/food.controller";

const foodRouter = express.Router();

foodRouter.get("/categories", getCategories);
foodRouter.get("/", getFoodsByCategory);
foodRouter.post( "/", createFood );

export default foodRouter;