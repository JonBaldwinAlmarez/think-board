import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import type { Note } from "../types/notes";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
	const [isRateLimit, setIsRatelimit] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [notes, setNotes] = useState<Note[]>([]);

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const res = await api.get("/notes");
				//console.log(res.data);
				setNotes(res.data);
				setIsRatelimit(false);
			} catch (error: any) {
				//console.error(`Fetching failed:	${error}`);
				if (error.response?.status === 429) {
					setIsRatelimit(true);
				} else {
					toast.error("Fail to load note");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchNote();
	}, []);

	return (
		<div className="min-h-screen">
			<NavBar />
			{isRateLimit && <RateLimitedUI />}

			<div className="max-w-7xl mx-auto p-4 mt-6">
				{loading && (
					<div className="text-center text-primary py-10">loading...</div>
				)}

				{notes.length === 0 && !isRateLimit && <NotesNotFound />}

				{notes.length > 0 && !isRateLimit && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{notes.map((note) => (
							<NoteCard key={note._id} note={note} setNotes={setNotes} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
