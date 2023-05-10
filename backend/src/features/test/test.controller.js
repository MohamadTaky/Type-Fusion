import mongoose from "mongoose";
import User from "features/users/user.model.js";
import Test from "./test.model.js";
import Exception from "common/classes/Exception.class.js";

export async function getUserData(req, res, next) {
	if (!mongoose.Types.ObjectId.isValid(req.id)) {
		next(new Exception(`${req.id} is not a valid id`, 404));
		return;
	}
	const [userDoc, testDocs] = await Promise.all([
		User.findById(req.id).select("-password"),
		Test.find({ host: req.id }),
	]);
	if (!userDoc) {
		next(new Exception("No such document", 404));
		return;
	}
	const map = {};
	testDocs.forEach(testDoc => {
		testDoc.values.forEach(value => {
			const mapItem = map[value.date];
			if (mapItem) {
				mapItem.quote.push(value.quote);
				mapItem.speed.push(value.speed);
				mapItem.score.push(value.score);
				mapItem.accuracy.push(value.accuracy);
				mapItem.errorCount.push(value.errorCount);
				mapItem.wrongEntries.push(value.wrongEntries);
			} else {
				map[value.date] = {
					quote: [value.quote],
					score: [value.score],
					speed: [value.speed],
					errorCount: [value.errorCount],
					accuracy: [value.accuracy],
					wrongEntries: [value.wrongEntries],
				};
			}
		});
	});
	res.status(200).json({
		...userDoc.toJSON(),
		tests: map,
	});
}

export async function addNewTest(req, res, next) {
	const { speed, accuracy, score, practiceDuration } = req.body;
	if (!mongoose.Types.ObjectId.isValid(req.id)) {
		next(new Exception(`${req.id} is not a valid id`, 404));
		return;
	}
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		await User.findOneAndUpdate(
			{ _id: req.id },
			{
				$inc: {
					totalSpeed: speed,
					totalAccuracy: accuracy,
					totalScore: score,
					practiceDuration: practiceDuration,
					completedTests: 1,
				},
				$max: {
					bestScore: score,
					bestSpeed: speed,
				},
				latestAccuracy: accuracy,
				latestSpeed: speed,
				latestScore: score,
			},
			{ runValidators: true, session }
		);
		const TestDoc = await Test.findOneAndUpdate(
			{ host: req.id, count: { $lt: 100 } },
			{
				host: req.id,
				$inc: { count: 1 },
				$push: { values: req.body },
			},
			{ upsert: true, runValidators: true, new: true, session }
		);
		await session.commitTransaction();
		res.status(200).json(TestDoc);
	} catch (error) {
		await session.abortTransaction();
		next(error);
	} finally {
		await session.endSession();
	}
}
