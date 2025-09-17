import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionStr = process.env.MONGO_URI || "";

async function connectDB() {
    try {
        console.log("Mongo URI from .env:", connectionStr);
        await mongoose.connect(connectionStr);

        console.log("MongoDB Connected");
    } catch(err) {
        console.error(err.message)
    }
}

export default connectDB;