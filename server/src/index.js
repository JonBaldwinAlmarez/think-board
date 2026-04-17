import express from "express";
import notesroutes from "./routes/notesRoutes.js";

const app = express();

app.use("/api/notes", notesroutes);

app.listen(5000, () => {
	console.log("Server is running on port 5000");
});

// mongodb+srv://almarezjbm_db_user:tNLNh37b1qhIDunW@cluster0.vp1hno7.mongodb.net/?appName=Cluster0
