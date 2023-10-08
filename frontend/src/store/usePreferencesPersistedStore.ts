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

export default usePreferencesPersistedStore;
