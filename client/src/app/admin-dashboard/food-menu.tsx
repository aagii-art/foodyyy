"use client"
import axios from "axios"
import { useEffect, useState } from "react";
import AllDishesButton from "./allDishesButton";
import AddFoodForm from "../component/addFoodForm";
import AddCategoryForm from "../component/addCategoryForm";
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

export default function FoodMenu () {

  const [showForm, setShowForm] = useState(false);
  const [foods, setFoods] = useState<FoodType [] >([]);
  const [categories, setCategories] = useState<Category []>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/foods/categories");
        setCategories(res.data.categories);

      } catch (error) {
        console.error(" get category error :", error);
      }
    };
    fetchCategories();
  }, []);
  console.log( " all category : ", categories);

  useEffect(() => {
  const fetchFoods = async () => {
    try {
      let url = "http://localhost:3000/api/foods";
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }

      const res = await axios.get(url);
      setFoods(res.data.foods);
    } catch (error) {
      console.error("Error fetching foods");
    }
  };
  fetchFoods();
}, [selectedCategory]);


  // useEffect(() => {
  //   console.log( " category by selected : ", selectedCategory);
    
  //   if (selectedCategory) {
  //     const fetchFoods = async () => {
  //       try {
  //         const res = await axios.get(`http://localhost:3000/api/foods?category=${selectedCategory}`);
  //         console.log( " foods by selected category ", res  );
          
  //         setFoods(res.data.foods);
  //       } catch (error) {
  //         console.error("Error fetching foods");
  //       }
  //     };
  //     fetchFoods();
  //   }
  // }, [selectedCategory]);

  return (
    <div className="p-4">
        <div className="mb-6">
            <button
              onClick={() => setShowCategoryForm(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              + Add Category
            </button>
            {
              <AllDishesButton 
                selectedCategory={selectedCategory}
                onClick={ () => { setSelectedCategory("") } }
               />
            }
            {showCategoryForm && (
              <AddCategoryForm
                onCategoryAdded={() => {
                  setShowCategoryForm(false);
                  axios.get("http://localhost:3000/api/foods/categories")
                    .then(res => setCategories(res.data.categories))
                    .catch(err => console.error("Reload category error", err));
                }}
                onClose={() => setShowCategoryForm(false)}
              />
            )}
        </div>

      <div>
          <h2 className="text-xl font-bold mb-4">Food Categories</h2>
          <div className="flex gap-4 mb-6">
            { categories && categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded ${selectedCategory === cat.name ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
      </div>
      
      { showForm && (
        <AddFoodForm
            onFoodAdded={() => { setShowForm(false) }}
            onClose={() => setShowForm(false)}
        />
      )}

      <div className="">
              <button
                   onClick={() => setShowForm(true)}
                   className="bg-green-600 text-white px-4 py-2 rounded"
              >
                   + Add Food
              </button>

            { foods.map((food) => (
              <div key={food._id} className="border p-4 rounded shadow-sm">
                <img src={`http://localhost:3000/${food.image}`} alt={food.name} className="w-full h-40 object-cover mb-2 rounded"/>
                <h3 className="font-bold text-lg">{food.category}</h3>
                <p>₮ {food.price}</p>
              </div>
            ))}
      </div>

    </div>
  );
}
