import mongoose from "mongoose";
import dotenv from "dotenv"; // Load environment variables from .env file

dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB successfully!");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1); // Exit the process with an error code
	}
};
