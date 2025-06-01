import express from "express";
import { createFood, getCategories, getFoodsByCategory, upload } from "../controllers/food.controller";

const foodRouter = express.Router();

foodRouter.get("/", getFoodsByCategory);
foodRouter.get("/categories", getCategories);

foodRouter.post("/", upload.single("jurag"), createFood);
export default foodRouter;