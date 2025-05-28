import { Request, Response } from "express";
import Food from "../models/food.model";


export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Food.distinct("category");
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getFoodsByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    if (!category) {
     res.status(400).json({ error: "Category is required" }); return ;
    }

    const foods = await Food.find({ category });
    res.json({ foods });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch foods" });
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

