import express from "express";
import {
	getAllNotes,
	getNotesByID,
	createNote,
	updateNote,
	deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

/**
 * Endpoints
 */

// GET /api/notes - Get all notes
router.get("/", getAllNotes);
router.get("/:id", getNotesByID);

// POST /api/notes - Create a new note
router.post("/", createNote);

// PUT /api/notes/:id - Update a note by ID
router.put("/:id", updateNote);

// DELETE /api/notes/:id - Delete a note by ID
router.delete("/:id", deleteNote);

export default router;
