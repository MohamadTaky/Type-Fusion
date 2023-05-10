import Exception from "#root/common/classes/Exception.class.js";
import jwt from "jsonwebtoken";
import User from "#root/features/users/user.model.js";
import mongoose from "mongoose";

export default async function requireAuth(req, res, next) {
	try {
		const { token } = req.cookies;
		if (!token) {
			throw new Exception("authorization token required", 400);
		}
		const { _id } = jwt.verify(token, process.env.SECRET);
		const user = await User.findOne({ _id }).select("_id");
		req.id = user._id.toString();
		next();
	} catch (error) {
		next(error);
	}
}
