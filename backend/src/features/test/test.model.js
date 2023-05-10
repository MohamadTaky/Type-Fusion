import mongoose, { Schema } from "mongoose";

const testSchema = new Schema({
	host: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "User",
	},
	count: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
		max: 100,
	},
	values: {
		type: [
			{
				date: {
					type: String,
					required: true,
					minlength: 8,
					maxlength: 8,
					default: () => new Date().toISOString().split("T")[0].split("-").join(""),
				},
				quote: {
					type: String,
					required: true,
				},
				speed: {
					type: Number,
					required: true,
					min: 0,
				},
				accuracy: {
					type: Number,
					required: true,
					min: 0,
					max: 100,
				},
				score: {
					type: Number,
					required: true,
					min: 0,
				},
				errorCount: {
					type: [Number],
					required: true,
				},
				wrongEntries: {
					type: [Number],
					required: true,
				},
			},
		],
		required: true,
	},
});

const Test = mongoose.model("Test", testSchema);
export default Test;
