import axios from "axios";

const BASE_URL =
	import.meta.env.MODE === "development"
		? "http://localhost:5000/api"
		: "https://think-board-ln50.onrender.com/api";
const api = axios.create({
	baseURL: BASE_URL,
});

export default api;
