import Exception from "common/classes/Exception.class.js";
import jwt from "jsonwebtoken";
import User from "./user.model.js";

function createToken(_id) {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}

export async function checkAuth(req, res, next) {
	const { token } = req.cookies;
	if (!token) {
		return res.status(200).json(null);
	}
	try {
		const { _id } = jwt.verify(token, process.env.SECRET);
		const user = await User.findOne({ _id }).select("-password");
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
}

export async function singin(req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await User.signin(email, password);
		const token = createToken(user._id);
		res
			.cookie("token", token, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
			})
			.status(200)
			.json({ email });
	} catch (error) {
		next(error);
	}
}

export async function signup(req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await User.signup(email, password);
		const token = createToken(user._id);
		res
			.cookie("token", token, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
			})
			.status(200)
			.json({ email });
	} catch (error) {
		next(new Exception(error.message, 400));
	}
}

export async function signout(req, res, next) {
	const { token } = req.cookies;
	if (!token) {
		return next(new Exception("user is already signed out", 400));
	}
	try {
		const { _id } = jwt.verify(token, process.env.SECRET);
		if (await User.exists({ _id })) {
			res
				.status(200)
				.clearCookie("token", {
					sameSite: "none",
					secure: true,
				})
				.json({ message: "signed out successfully" });
		}
	} catch (error) {
		next(error);
	}
}
