import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define the MongoDB URI from the environment variable
const mongoURI = process.env.DB_URL; // Get the MongoDB URL from the environment variable

// Function to connect to MongoDB
const connectDB = async () => {
    if (!mongoURI) {
        console.error("DB_URL is not defined in .env");
        process.exit(1);
    }
    
    try {
        await mongoose.connect(mongoURI, {
          
        });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
};

// Call the connectDB function
export default connectDB
