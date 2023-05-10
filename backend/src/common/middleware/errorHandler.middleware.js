import Exception from "../classes/Exception.class.js";

export default function errorHandler(err, _req, res, _next) {
	console.log(err);
	if (err instanceof Exception) res.status(err.code).json({ message: err.message });
	else res.status(500).json({ message: "unknown error occured" });
}
