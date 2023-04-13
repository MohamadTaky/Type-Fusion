import { Record } from "@phosphor-icons/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Stats = {
	speed: number[];
	accuracy: number[];
	score: number[];
};
type Days = Record<number, Stats>;
type Months = Record<number, Days>;
interface IStatsPersistedStore extends Record<number, Months> {
	latestSpeed: number | null;
	latestAccuracy: number | null;
	latestScore: number | null;
	getStats: (year: number) => Months;
	addStats: (stats: { speed: number; accuracy: number; score: number }) => void;
}

const useStatsPersistedStore = create<IStatsPersistedStore>()(
	persist(
		(set, get) => ({
			latestSpeed: null,
			latestAccuracy: null,
			latestScore: null,
			getStats: year => get()[year],
			addStats: stats =>
				set(state => {
					const today = new Date();
					const year = today.getUTCFullYear();
					const month = today.getUTCMonth();
					const day = today.getUTCDate();
					const prevStats = state.getStats(year)?.[month]?.[day];
					return {
						...state,
						latestSpeed: stats.speed,
						latestAccuracy: stats.accuracy,
						latestScore: stats.score,
						[year]: {
							[month]: {
								[day]: {
									speed: prevStats ? [...prevStats?.speed, stats.speed] : [stats.speed],
									accuracy: prevStats ? [...prevStats.accuracy, stats.accuracy] : [stats.accuracy],
									score: prevStats ? [...prevStats?.score, stats.score] : [stats.score],
								},
							},
						},
					};
				}),
		}),
		{ name: "statsPersistedStore" }
	)
);

export function useLatestStats() {
	return useStatsPersistedStore(state => ({
		speed: state.latestSpeed,
		accuracy: state.latestAccuracy,
		score: state.latestScore,
	}));
}

export function useStats(year: number) {
	return useStatsPersistedStore(state => state.getStats(year));
}

export function useAddStats() {
	return useStatsPersistedStore(state => state.addStats);
}

export default useStatsPersistedStore;
