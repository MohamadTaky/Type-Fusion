import { create } from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns-tz";

type Stats = {
	tests: string[];
	speed: number[];
	accuracy: number[];
	score: number[];
	errors: number[];
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

	stats: Record<string, Stats>;

	addStats: (stats: {
		speed: number;
		accuracy: number;
		score: number;
		duration: number;
		test: string;
		errors: number;
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

			stats: {},
			addStats: stats =>
				set(state => {
					const today = format(new Date(), "yyyyMMdd", { timeZone: "utc" });
					const prevStats = state.stats[today];
					return {
						...state,
						completedTests: state.completedTests + 1,
						practiceDuration: state.practiceDuration + stats.duration,

						latestSpeed: stats.speed,
						totalSpeed: state.totalSpeed + stats.speed,
						bestSpeed: stats.speed > state.bestSpeed ? stats.speed : state.bestSpeed,
						averageSpeed: Math.round((state.totalSpeed || stats.speed) / (state.completedTests + 1)),

						latestAccuracy: stats.accuracy,
						totalAccuracy: state.totalAccuracy + stats.accuracy,
						averageAccuracy: Math.round((state.totalAccuracy || stats.accuracy) / (state.completedTests + 1)),

						latestScore: stats.score,
						totalScore: state.totalScore + stats.score,
						bestScore: stats.score > state.bestScore ? stats.score : state.bestScore,
						averageScore: Math.round((state.totalScore || stats.score) / (state.completedTests + 1)),

						stats: {
							...state.stats,
							[today]: {
								tests: prevStats ? [...prevStats?.tests, stats.test] : [stats.test],
								speed: prevStats ? [...prevStats?.speed, stats.speed] : [stats.speed],
								accuracy: prevStats ? [...prevStats.accuracy, stats.accuracy] : [stats.accuracy],
								score: prevStats ? [...prevStats?.score, stats.score] : [stats.score],
								errors: prevStats ? [...prevStats?.errors, stats.errors] : [stats.errors],
								wrongEntries: prevStats
									? [...prevStats?.wrongEntries, stats.wrongEntries]
									: [stats.wrongEntries],
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
	return useStatsPersistedStore(state => state.stats);
}

export function useAddStats() {
	return useStatsPersistedStore(state => state.addStats);
}
export default useStatsPersistedStore;
