"use client"
import { useEffect, useState } from "react";
import axios from "axios";

type Food = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};
const FoodList = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/foods");
        setFoods(response.data);
      } catch (err : any) {
        setError(` failed to get foods data : ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      { foods && foods.map((f) => (
        <div key={f._id} >
          <h2>{f.name}</h2>
          <img src={f.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default FoodList;

