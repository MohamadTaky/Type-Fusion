import { create } from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns-tz";

type Stats = {
	quote: string[];
	speed: number[];
	accuracy: number[];
	score: number[];
	errorCount: number[];
	wrongEntries: number[][];
};

interface IStatsPersistedStore {
	completedTests: number;
	practiceDuration: number;

	latestSpeed: number;
	totalSpeed: number;
	bestSpeed: number;
	averageSpeed: number;

	latestAccuracy: number;
	totalAccuracy: number;
	averageAccuracy: number;

	latestScore: number;
	totalScore: number;
	bestScore: number;
	averageScore: number;

	tests: Record<string, Stats>;

	addTest: (test: {
		speed: number;
		accuracy: number;
		score: number;
		practiceDuration: number;
		quote: string;
		errorCount: number;
		wrongEntries: number[];
	}) => void;
}

const useStatsPersistedStore = create<IStatsPersistedStore>()(
	persist(
		set => ({
			completedTests: 0,
			practiceDuration: 0,

			latestSpeed: 0,
			totalSpeed: 0,
			bestSpeed: 0,
			averageSpeed: 0,

			latestAccuracy: 0,
			totalAccuracy: 0,
			averageAccuracy: 0,

			latestScore: 0,
			totalScore: 0,
			bestScore: 0,
			averageScore: 0,

			tests: {},
			addTest: test =>
				set(state => {
					const today = format(new Date(), "yyyyMMdd", { timeZone: "utc" });
					const prevTests = state.tests[today];
					return {
						...state,
						completedTests: state.completedTests + 1,
						practiceDuration: state.practiceDuration + test.practiceDuration,

						latestSpeed: test.speed,
						totalSpeed: state.totalSpeed + test.speed,
						bestSpeed: test.speed > state.bestSpeed ? test.speed : state.bestSpeed,
						averageSpeed: Math.round((state.totalSpeed + test.speed) / (state.completedTests + 1)),

						latestAccuracy: test.accuracy,
						totalAccuracy: state.totalAccuracy + test.accuracy,
						averageAccuracy: Math.round((state.totalAccuracy + test.accuracy) / (state.completedTests + 1)),

						latestScore: test.score,
						totalScore: state.totalScore + test.score,
						bestScore: test.score > state.bestScore ? test.score : state.bestScore,
						averageScore: Math.round((state.totalScore + test.score) / (state.completedTests + 1)),

						tests: {
							...state.tests,
							[today]: {
								quote: prevTests ? [test.quote, ...prevTests?.quote] : [test.quote],
								speed: prevTests ? [test.speed, ...prevTests?.speed] : [test.speed],
								accuracy: prevTests ? [test.accuracy, ...prevTests.accuracy] : [test.accuracy],
								score: prevTests ? [test.score, ...prevTests?.score] : [test.score],
								errorCount: prevTests ? [test.errorCount, ...prevTests?.errorCount] : [test.errorCount],
								wrongEntries: prevTests
									? [test.wrongEntries, ...prevTests?.wrongEntries]
									: [test.wrongEntries],
							},
						},
					};
				}),
		}),
		{ name: "statsPersistedStore" }
	)
);

export function useCompletedTests() {
	return useStatsPersistedStore(state => state.completedTests);
}

export function usePracticeDuration() {
	return useStatsPersistedStore(state => state.practiceDuration);
}

export function useLatestStats() {
	return useStatsPersistedStore(state => ({
		speed: state.latestSpeed,
		accuracy: state.latestAccuracy,
		score: state.latestScore,
	}));
}

export function useBestStats() {
	return useStatsPersistedStore(state => ({
		bestSpeed: state.bestSpeed,
		bestScore: state.bestScore,
	}));
}

export function useAverageStats() {
	return useStatsPersistedStore(state => ({
		averageSpeed: state.averageSpeed,
		averageAccuracy: state.averageAccuracy,
		averageScore: state.averageScore,
	}));
}

export function useStats() {
	return useStatsPersistedStore(state => state.tests);
}

export function useAddTest() {
	return useStatsPersistedStore(state => state.addTest);
}

export default useStatsPersistedStore;
