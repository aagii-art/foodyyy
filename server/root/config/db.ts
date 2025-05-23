import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.MONGO_KEY as string );
        console.log(" mongoDB connected ");
    } catch (error) {
        console.log("db not connected : ", error );
        process.exit(1);
    }
}
export default connectDB;