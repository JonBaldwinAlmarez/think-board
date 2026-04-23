import { PenSquareIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/util";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { Note } from "../types/notes";

interface NoteCardProps {
	note: Note;
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NoteCard = ({ note, setNotes }: NoteCardProps) => {
	const handleDelete = async (
		e: React.MouseEvent<HTMLButtonElement>,
		id: string,
	) => {
		e.preventDefault();
		if (!window.confirm("Are you sure to delete this note?")) return;

		try {
			api.delete(`/notes/${id}`);
			toast.success("Note Deleted");
			// Update UI
			setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of deleted note
		} catch (error) {
			console.error("Fail to delete Note: ", error);
			toast.error("Fail to delete note");
		}
	};
	return (
		<div>
			<Link
				to={`/note/${note._id}`}
				className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9D]"
			>
				<div className="card-body">
					<h3 className="card-title text-base-content">{note.title}</h3>
					<p className="text-base-content/70 line-clamp-3">{note.content}</p>
					<div className="card-actions justify-between items-center mt-4">
						<span>{formatDate(note.createdAt)}</span>
						<div className="flex items-center gap-1">
							<PenSquareIcon className="size-4" />
							<button
								onClick={(e) => {
									handleDelete(e, note._id);
								}}
								className="btn btn-ghost btn-xs text-error"
							>
								<TrashIcon className="size-4" />
							</button>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default NoteCard;
