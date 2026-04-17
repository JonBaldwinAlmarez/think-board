import express from "express";
import notesroutes from "./routes/notesRoutes.js";

const app = express();

app.use("/api/notes", notesroutes);

app.listen(5000, () => {
	console.log("Server is running on port 5000");
});
