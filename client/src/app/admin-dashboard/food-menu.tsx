"use client"
import { useEffect, useState } from "react"
import axios from "axios"

 interface FoodType {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function FoodMenu () {
  const [categories, setCategories] = useState<string []>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [foods, setFoods] = useState<FoodType [] >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/foods/categories");
        console.log(res);
        
        setCategories(res.data.categories); 
      } catch (error) {
        console.error(" get category error :", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchFoods = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/foods?category=${selectedCategory}`);
          setFoods(res.data.foods);
        } catch (error) {
          console.error("Error fetching foods");
        }
      };
      fetchFoods();
    }
  }, [selectedCategory]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Food Categories</h2>
      <div className="flex gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-2">Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div key={food._id} className="border p-4 rounded shadow-sm">
            <img src={food.image} alt={food.name} className="w-full h-40 object-cover mb-2 rounded"/>
            <h3 className="font-bold text-lg">{food.name}</h3>
            <p>₮ {food.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
