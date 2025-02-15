import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI);
    }catch(error){
        console.log("Error:", error);
    }

}
mongoose.connection.on("connected", () => {
    console.log("Database connected successfully!");
});

export default connectDB;