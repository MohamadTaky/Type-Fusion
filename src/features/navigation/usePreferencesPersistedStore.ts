import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IPreferencesPersistedStore {
	darkMode: boolean;
	toggleDarkMode: () => void;
}

const usePreferencesPersistedStore = create<IPreferencesPersistedStore>()(
	persist(
		set => ({
			darkMode: false,
			toggleDarkMode: () => set(state => ({ ...state, darkMode: !state.darkMode })),
		}),
		{ name: "preferencesStore" }
	)
);

export function useDarkMode() {
	return usePreferencesPersistedStore(state => state.darkMode);
}
export function useToggleDarkMode() {
	return usePreferencesPersistedStore(state => state.toggleDarkMode);
}
