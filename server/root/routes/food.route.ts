import express from "express";
import { createFood, getAllFoods } from "../controllers/food.controller";

const foodRouter = express.Router();

foodRouter.get("/", getAllFoods);
foodRouter.post( "/", createFood );

export default foodRouter;