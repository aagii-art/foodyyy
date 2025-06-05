"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface AllDishesButtonProps {
  selectedCategory: string;
  onClick: () => void;}
 interface FoodType {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}
interface Category {
  _id: string;
  name: string;
}

export default function AllDishesButton({ selectedCategory, onClick }: AllDishesButtonProps) {
const isActive = selectedCategory === "";
const [foods, setFoods] = useState<FoodType [] >([]);
const [categories, setCategories] = useState<Category []>([]);
    
  useEffect(() => {
  const fetchData = async () => {
    try {
      const [catRes, foodRes] = await Promise.all([
        axios.get("http://localhost:3000/api/foods/categories"),
        axios.get("http://localhost:3000/api/foods"),
      ]);
      console.log(" category  ", catRes, " foods", foodRes );

      setCategories(catRes.data.categories);
      setFoods(foodRes.data.foods);
    } catch (error) {
      console.error("Fetch all data error", error);
    }
  };

  fetchData();
 }, []);

  return (
    <div>
        { selectedCategory === "" &&
           categories.map((cat) => {
              const foodsForCategory = foods.filter(food => food.category === cat._id);
              return (
                <div key={cat._id} className="mb-6">
                  <h2 className="text-xl font-bold mb-2">{cat.name}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {foodsForCategory.map((food) => (
                      <div key={food._id} className="border p-4 rounded shadow-sm">
                        <img src={`http://localhost:3000/${food.image}`} alt={food.name} className="w-full h-40 object-cover mb-2 rounded"/>
                        <h3 className="font-semibold">{food.name}</h3>
                        <p>₮ {food.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
           })
        }
    </div>
  );
}
