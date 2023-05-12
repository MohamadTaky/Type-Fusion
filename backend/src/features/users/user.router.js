import Exception from "common/classes/Exception.class.js";
import { Router } from "express";
import { checkAuth, singin, signup, signout } from "./user.controller.js";
import User from "./user.model.js";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.get("/", checkAuth);
userRouter.get("/checkusername", async (req, res, next) => {
	const { username } = req.query;
	try {
		const exists = await User.exists({ username });
		res.status(200).json({ exists: !!exists });
	} catch (error) {
		next(error);
	}
});
userRouter.post("/editusername", async (req, res, next) => {
	const { username } = req.body;
	const { token } = req.cookies;
	try {
		if (!token) {
			throw new Exception("authorization token required", 400);
		}
		const { _id } = jwt.verify(token, process.env.SECRET);
		const exists = await User.exists({ username });
		if (exists) {
			throw new Exception("username already exists", 400);
		}
		const user = await User.findOneAndUpdate({ _id }, { username });
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});
userRouter.get("/leaderboard", async (_req, res, next) => {
	try {
		const topUsers = await User.find(
			{ latestSpeed: { $gt: 0 } },
			"latestSpeed latestScore latestAccuracy username",
			{ limit: 10, sort: { score: -1 } }
		);
		res.status(200).json(topUsers);
	} catch (error) {
		next(error);
	}
});
userRouter.post("/signin", singin);
userRouter.post("/signup", signup);
userRouter.post("/signout", signout);

export default userRouter;
