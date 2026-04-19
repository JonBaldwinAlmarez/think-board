import express from "express";
import notesroutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/notes", notesroutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
