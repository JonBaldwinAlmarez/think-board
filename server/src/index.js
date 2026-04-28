import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import noteRoutes from "./routes/notesRoutes.js";
import rateLimit from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(
	cors({
		origin: "http://localhost:5173",
	}),
); // Allow access to every URL, Prevent Access-Control-Allow-Origin error
app.use(express.json());
app.use(rateLimit);

app.use("/api/notes", noteRoutes);

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to connect to the database:	", error);
	});
