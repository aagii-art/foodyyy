import path from "path";
import multer from "multer";
import Food from "../models/food.model";
import { Request, Response } from "express";
import CategoryModel from "../models/category.model";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log( " category from frontend : ", req.body );
    
    if (!name || name.trim() === "") {
       res.status(400).json({ message: "Category name is required" });
       return;
    }

    const existing = await CategoryModel.findOne({ name });
    if (existing) {
       res.status(400).json({ message: "Category already exists" });
       return;
    }

    const newCategory = new CategoryModel({ name });
    await newCategory.save();
    console.log( " added category :", newCategory );
    
    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (err) {
    console.error("Add category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFoodsByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const foods = category ? await Food.find({ category }) : await Food.find() ;
    res.json({ foods });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch foods" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); 
  },
  filename : (req, file, cb) => {
    console.log(" multer deer input-aar irjiga file buyu zurag  : ", file  );
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); 
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

export const upload = multer({ 
  storage : storage,
  limits : { fileSize : 5 * 1024 * 1024 },
  fileFilter : (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false); 
  }} 
});

export const createFood = async (req: Request, res: Response) => {
    try {
        const { name, description, price,  category } = req.body;
        const imagePath = req.file?.path;
        console.log(" this is multer-iin oorchilson zuragnii path : ", imagePath );
        console.log( " this is req.body > foodform-oor irjiga : ", req.body );
        
        if (!name || !description || !price || !imagePath  || !category) {
             res.status(400).json({ message: "All fields are required" });
             return;
        }
        const newFood = new Food({ name, description, price, image : imagePath, category  });
        const savedFood = await newFood.save();
        console.log( " saved food : " , savedFood );
        
        res.status(201).json({ message: "Food created successfully", savedFood });

    } catch (error) {
        console.error( ` createFood-iin error shuu bro : ${error}` )
    }
}

export const updateFood = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const foodId = req.params.id;
    const { name, description, price, category } = req.body;
    const imagePath = req.file?.path;

    const updateData: any = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (category) updateData.category = category;
    if (imagePath) updateData.image = imagePath;

    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      updateData,
      { new: true }
    );

    if (!updatedFood) {
       res.status(404).json({ message: "Food not found" });
       return;
    }

    res.status(200).json({ message: "Food updated successfully", food: updatedFood });
  } catch (error) {
    res.status(500).json({ message: "Server error during food update" });
  }
};
