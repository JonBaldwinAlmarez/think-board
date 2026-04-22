import mongoose from "mongoose";

// Define the Note schema
// 1. Create schema
// 2. Create model

const noteSchema = new mongoose.Schema(
	{
		// fields
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Note = mongoose.model("Note", noteSchema); //model name, schema

export default Note;
