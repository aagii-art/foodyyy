import express from "express";
import userRoute from "./routes/user.route";
import connectDB from "./config/db";
import dotenv from "dotenv";
import foodRouter from "./routes/food.route";
import cors from "cors";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use( "/api/foods", foodRouter );
app.use( "/api/users", userRoute );
app.get( "/", (q, s ) => {
    s.send(" server running ");
}); 

app.listen( port, () => {
    console.log(" server running ");
    connectDB();
});


