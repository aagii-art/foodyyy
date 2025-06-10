"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import EditDishForm from "./editDishForm";

interface AllDishesButtonProps {
  selectedCategory: string;
  oClick : ( a : string ) => void;
}
 interface FoodType {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description : string;
}
interface Category {
  _id: string;
  name: string;
}

export default function AllDishesButton({ selectedCategory, oClick,}: AllDishesButtonProps) {

const [showForm, setShowForm] = useState(false);
const [foods, setFoods] = useState<FoodType [] >([]);
const [categories, setCategories] = useState<Category []>([]); 
const [editingFood, setEditingFood] = useState<FoodType | null>(null);

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
 }, [selectedCategory]);

  return (
    <div className="  " >
         { selectedCategory === "" &&
           categories.map((cat) => {
              const foodsForCategory = foods.filter(food => food.category === cat.name );
              
              return (
                <div key={cat._id} className="bg-white p-[20px] my-[20px]">
                 { editingFood &&
                    <EditDishForm food={editingFood} />
                 } 
                  <h2 className="text-xl font-bold mb-2">{cat.name} ({ foodsForCategory.length }) </h2>
                  <div className=" gap-[20px] grid grid-cols-4 ">
                    <div
                        onClick={ () => oClick( cat.name ) }
                        className=" border border-dashed border-red-500 flex-col justify-center items-center flex "
                    >    <button className=" bg-[#EF4444] text-white rounded-full h-[40px] w-[40px] " > + </button>
                         <p> add new dish </p> 
                         <p>  { cat.name } </p> 
                    </div>
                    {foodsForCategory.map((food) => (
                      <div key={food._id} className="relative  border border-[#E4E4E7] p-[10px] rounded-lg shadow-sm">
                        <img src={`http://localhost:3000/${food.image}`} alt={food.name} className="w-full h-40 object-cover mb-2 rounded"/>
                        <div className=" flex justify-between " >
                            <h3 className="font-semibold text-[#EF4444] text-[14px]">{food.name}</h3>
                            <p>$ {food.price}</p>
                        </div>
                        <p className="  " > { food.description } </p>
                        <button 
                            onClick={ () =>  setEditingFood(food) }
                            className="absolute top-[50%] flex justify-center items-center right-[5%] w-[44px] h-[44px] rounded-full bg-white "
                         >
                          <img src="edit.png" alt=""  />
                        </button>
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
