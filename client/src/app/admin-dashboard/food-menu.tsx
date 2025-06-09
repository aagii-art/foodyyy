"use client"
import axios from "axios"
import { useActionState, useEffect, useState } from "react";
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
  const [ numberFoods, setNumberFoods ] = useState< FoodType []>([]);
  const [categories, setCategories] = useState<Category []>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [ selectedCategoryName, setSelectedCategoryName ] = useState("");

  const handleoClick = ( v : string ) => {
    console.log(v);
    setSelectedCategoryName( v );
    setShowForm(true);
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/foods/categories");
        const numberFood = await axios.get(`http://localhost:3000/api/foods`);
        setNumberFoods(numberFood.data.foods);
        setCategories(res.data.categories);

      } catch (error) {
        console.error(" get category error :", error);
      }
    };
    fetchCategories();
  }, []);
  console.log( " all category : ", categories);

const fetchFoods = async (category: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/foods?category=${category}`);
    console.log("foods by selected category", res);
    setFoods(res.data.foods);
  } catch (error) {
    console.error("Error fetching foods", error);
  }
};

useEffect(() => {

  if (selectedCategory) {
    fetchFoods(selectedCategory);
  }
}, [selectedCategory]);

  return (
    <div className=" bg-gray-200 p-[20px] flex flex-col  ">

      <div className="bg-white p-[20px] " >
          <h2 className="text-xl font-bold mb-4"> Dishes Categories </h2>
          <div className="flex flex-wrap gap-4 mb-6">
                <button 
                    onClick={ () => { setSelectedCategory("") } }
                    className={`rounded-full py-[10px] px-4 border ${ !selectedCategory ? " border-red-500 " : " border-[#E4E4E7] " } `}
                >
                  All dishes <span className=" px-[10px] rounded-full py-[5px] bg-[#18181B] text-white " > {numberFoods.length } </span> 

                </button>
    
                { categories && categories.map((cat) => {
                  const foodsForCategory = numberFoods.filter(food => food.category === cat.name );
    
                  return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-[10px] rounded-full border  ${selectedCategory === cat.name ? " border-red-500 " : " border-[#E4E4E7] "}`}
                  >
                    {cat.name} <span className=" px-[10px] rounded-full py-[5px] bg-[#18181B] text-white " > { foodsForCategory.length } </span> 
                  </button> )
                })}
    
                <button
                  onClick={() => setShowCategoryForm(true)}
                  className="w-[40px] h-[40px] rounded-full bg-[#EF4444] text-white px-4 py-2 "
                >
                  + 
                </button>
    
          </div>
      </div>
      
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

      { showForm && (
        <AddFoodForm
            selectedCategory={selectedCategory}
            selectedCategoryName={selectedCategoryName}
            onFoodAdded={() => { setShowForm(false), fetchFoods( selectedCategory ); }}
            onClose={() => setShowForm(false)}
        />
      )}

      { !selectedCategory &&
              <AllDishesButton 
                selectedCategory={selectedCategory}
                oClick={handleoClick}
               />
      }
      { selectedCategory && 
        <h2 className=" font-semibold text-[20px] " > { selectedCategory } </h2>
      }
      { selectedCategory &&
        <div className="p-[20px] gap-[10px] bg-green-200 grid grid-cols-4 ">
              <button
                   onClick={() => setShowForm(true)}
                   className=" px-4 py-2 border border-dashed border-red-500 rounded-lg"
              >
                 <p> Add new Dish to </p>
                 <p> { selectedCategory } </p>    
              </button>

            { foods.map((food) => (
              <div key={food._id} className="border border-[#E4E4E7] rounded-lg">
                <img src={`http://localhost:3000/${food.image}`} alt={food.name} className="w-full min-h-screen-[50%] object-cover mb-2 rounded"/>
                <h3 className="font-bold text-lg">{food.category}</h3>
                <p>₮ {food.price}</p>
              </div>
            ))}
        </div>
      }

    </div>
  );
}
