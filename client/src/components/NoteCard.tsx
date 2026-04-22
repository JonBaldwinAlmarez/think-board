import { PenSquareIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/util";

interface Note {
	_id: string;
	title: string;
	content: string;
	createdAt: string;
}

interface NoteCardProps {
	note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
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
							<button className="btn btn-ghost btn-xs text-error">
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
