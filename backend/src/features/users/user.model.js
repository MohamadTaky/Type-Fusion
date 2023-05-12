import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import Exception from "common/classes/Exception.class.js";

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		practiceDuration: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		completedTests: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		totalSpeed: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		latestSpeed: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		bestSpeed: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		totalAccuracy: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		latestAccuracy: {
			type: Number,
			required: true,
			min: 0,
			max: 100,
			default: 0,
		},
		totalScore: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		latestScore: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		bestScore: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
	},
	{ toObject: { virtuals: true }, toJSON: { virtuals: true }, id: false }
);
UserSchema.virtual("averageSpeed").get(function () {
	return Math.round(this.totalSpeed / this.completedTests) || 0;
});
UserSchema.virtual("averageAccuracy").get(function () {
	return Math.round(this.totalAccuracy / this.completedTests) || 0;
});
UserSchema.virtual("averageScore").get(function () {
	return Math.round(this.totalScore / this.completedTests) || 0;
});
UserSchema.statics.signup = async function (username, email, password) {
	console.log(username);
	if (!username || !email || !password) {
		throw new Exception("all fields must be filled", 400);
	}
	if (username.length < 6) {
		throw new Exception("username must be at least six characters", 400);
	}
	if (!validator.isEmail(email)) {
		throw new Exception("invalid email", 400);
	}
	if (password.length < 8) {
		throw new Exception("password must be at least eight characters", 400);
	}
	if (!validator.isStrongPassword(password, { minLength: 8 })) {
		throw new Exception("password is not a strong password", 400);
	}
	if (await this.exists({ username })) {
		throw new Exception("username alrady exists", 400);
	}
	if (await this.exists({ email })) {
		throw new Exception("email alrady exists", 400);
	}
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);
	return await this.create({ username, email, password: hashedPassword });
};
UserSchema.statics.signin = async function (email, password) {
	if (!email || !password) {
		throw new Exception("all fields must be filled", 400);
	}
	const user = await this.findOne({ email });
	if (!user) {
		throw new Exception("incorrect email", 404);
	}
	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		throw new Exception("incorrect password", 404);
	}
	return user;
};

const User = mongoose.model("User", UserSchema);

export default User;
