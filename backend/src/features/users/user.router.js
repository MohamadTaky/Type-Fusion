import { Router } from "express";
import {
	checkAuth,
	singin,
	signup,
	signout,
	editUsername,
	checkUsername,
	getLeaderboard,
	deleteAccount,
} from "./user.controller.js";
import requireAuth from "common/middleware/requireAuth.middleware.js";
import User from "./user.model.js";
import Test from "features/test/test.model.js";
import mongoose from "mongoose";

const userRouter = Router();

userRouter.get("/", checkAuth);
userRouter.get("/checkusername", checkUsername);
userRouter.get("/leaderboard", getLeaderboard);
userRouter.post("/signin", singin);
userRouter.post("/signup", signup);
userRouter.post("/signout", signout);
userRouter.use(requireAuth);
userRouter.post("/editusername", editUsername);
userRouter.delete("/editusername", async (req, res, next) => {
	const session = await mongoose.startSession();
	try {
		await Promise.all([
			User.deleteOne({ _id: req.id }, { session }),
			Test.deleteMany({ host: req.id }, { session }),
		]);
		await session.commitTransaction();
		res.status(200).json({ message: "account has been deleted" });
	} catch (error) {
		await session.abortTransaction();
		next(error);
	} finally {
		await session.endSession();
	}
});

export default userRouter;
