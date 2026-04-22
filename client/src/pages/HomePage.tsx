import NavBar from "../components/navbar";
import { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";

interface Note {
	title: string;
	content: string;
}

const HomePage = () => {
	const [isRateLimit, setIsRatelimit] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [notes, setNotes] = useState<Note[]>([]);

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const res = await axios.get("http://localhost:5000/api/notes");
				console.log(res.data);
				setNotes(res.data);
				setIsRatelimit(false);
			} catch (error: any) {
				console.error(`Fetching failed:	${error}`);
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

				{notes.length > 0 && !isRateLimit && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{notes.map((note) => (
							<NoteCard key={note._id} note={note} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
