import rateLimit from "../src/config/upstash.js";

const rateLimiter = async (req, res, next) => {
	try {
		const { success } = await rateLimit.limit("My-Limit-key");

		if (!success) {
			return res.status(429).json({ error: "Too Many Requests" });
		}

		next();
	} catch (error) {
		console.error("Rate limiter error:", error);
		next(error);
	}
};

export default rateLimiter;
