import Note from "../../model/Note.js";

export async function getAllNotes(req, res) {
	try {
		const notes = await Note.find().sort({ createdAt: -1 }); // sort notes by creation date in descending order
		res.status(200).json(notes); // get all notes from database and send as response
	} catch (error) {
		console.error(`Error fetching notes: ${error}`);
		res.status(500).json({
			message: `Error fetching notes: ${error}`,
		});
	}
}

export async function getNotesByID(req, res) {
	try {
		const note = await Note.findById(req.params.id);

		if (!note) {
			return res
				.status(404)
				.json({ message: `Note with ID ${req.params.id} not found!` });
		}

		res.status(200).json(note);
	} catch (error) {
		res.status(500).json({
			message: `Error fetching note: ${error}`,
		});
	}
}

export async function createNote(req, res) {
	try {
		const { title, content } = req.body;
		const note = new Note({ title, content });

		const savedNote = await note.save();
		res.status(201).json(savedNote);
	} catch (error) {
		console.error(`Error creating note: ${error}`);
		res.status(500).json({
			message: `Error creating note: ${error}`,
		});
	}
}

export async function updateNote(req, res) {
	try {
		const { title, content } = req.body;
		const updatedNote = await Note.findByIdAndUpdate(
			req.params.id,
			{
				title,
				content,
			},
			{ new: true },
		);

		if (!updatedNote) {
			return res.status(404).json(updatedNote);
		}

		res.status(200).json(updatedNote);
	} catch (error) {
		res.status(500).json({
			message: `Error updating note: ${error}`,
		});
	}
}

export async function deleteNote(req, res) {
	try {
		const deletedNote = await Note.findByIdAndDelete(req.params.id);

		if (!deletedNote) {
			console.error(`Note with ID ${req.params.id} not found!`);
			return res
				.status(404)
				.json({ message: `Note with ID ${req.params.id} not found!` });
		}

		res.status(200).json(deletedNote);
	} catch (error) {
		console.error(`Error deleting note: ${error}`);
		res.status(500).json({
			message: `Error deleting note: ${error}`,
		});
	}
}
