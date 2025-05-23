import mongoose, { Schema, Document } from "mongoose";

interface typeFood extends Document {
   name: string;
   description: string;
   price: number;
   category: string;
   image: string;
}

const foodSchema = new Schema<typeFood>(
    {
    name: {
          type: String,
          required: true,
    },
    description: {
               type: String,
               required: true,
    },  
    price: {
          type: Number,
          required: true,
    },
    category: {
            type: String,
            required: true,
    },
    image: {
          type: String,
          required: true,
    },},
   { timestamps  : true }
) ;
const Food = mongoose.model( "foody", foodSchema );
export default Food;