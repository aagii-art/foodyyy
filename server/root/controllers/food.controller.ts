import { Request, Response } from "express";
import Food from "../models/food.model";

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const createFood = async (req: Request, res: Response) => {
    try {
        const { name, description, price, image, category } = req.body;
        if (!name || !description || !price || !image || !category) {
             res.status(400).json({ message: "All fields are required" });
             return;
        }
        const newFood = new Food({ name, description, price, image, category });
        const savedFood = await newFood.save();
        res.status(201).json({ message: "Food created successfully", food: savedFood });

    } catch (error) {
        res.send( ` server error shuu bro : ${error}` )
    }
}

