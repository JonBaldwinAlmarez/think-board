import NavBar from "../components/navbar";
import { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";

const HomePage = () => {
	const [isRateLimit, setIsRatelimit] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const res = await axios.get("http://localhost:5000/api/notes");
				console.log(res.data);
			} catch (error) {
				console.error(`Fetching failed:	${error}`);
			}
		};
		fetchNote();
	}, []);

	return (
		<div className="min-h-screen">
			<NavBar />
			{isRateLimit && <RateLimitedUI />}
		</div>
	);
};

export default HomePage;
