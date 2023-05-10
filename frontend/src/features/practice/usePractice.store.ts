import { create } from "zustand";

interface PracticeStore {
	keys: Record<string, { pressed: boolean; correct: boolean }>;
	addKey: (code: string) => void;
	pressKey: (code: string, correct: boolean) => void;
	releaseKey: (code: string) => void;
	currentLetterIndex: number;
	incrementCurrentLetterIndex: () => void;
	resetCurrentLetterIndex: () => void;
	currentQuoteIndex: number;
	incrementCurrentQuoteIndex: () => void;
	errorCount: number;
	incrementErrorCount: () => void;
	resetErrorCount: () => void;
}

const usePracticeStore = create<PracticeStore>()(set => ({
	currentLetterIndex: 0,
	incrementCurrentLetterIndex: () =>
		set(state => ({ ...state, currentLetterIndex: state.currentLetterIndex + 1 })),
	resetCurrentLetterIndex: () => set(state => ({ ...state, currentLetterIndex: 0 })),
	currentQuoteIndex: 0,
	incrementCurrentQuoteIndex: () =>
		set(state => ({ ...state, currentQuoteIndex: state.currentQuoteIndex + 1 })),
	errorCount: 0,
	incrementErrorCount: () => set(state => ({ ...state, errorCount: state.errorCount + 1 })),
	resetErrorCount: () => set(state => ({ ...state, errorCount: 0 })),
	keys: {},
	addKey: code =>
		set(state => ({
			...state,
			keys: {
				...state.keys,
				[code]: {
					pressed: false,
					correct: false,
				},
			},
		})),
	pressKey: (code, correct) =>
		set(state => ({
			...state,
			keys: {
				...state.keys,
				[code]: {
					pressed: true,
					correct,
				},
			},
		})),
	releaseKey: (code) =>
		set(state => ({
			...state,
			keys: {
				...state.keys,
				[code]: {
					pressed: false,
					correct: false,
				},
			},
		})),
}));

export function useCurrentLetterIndex() {
	return usePracticeStore(state => state.currentLetterIndex);
}
export function useIncrementCurrentLetterIndex() {
	return usePracticeStore(state => state.incrementCurrentLetterIndex);
}
export function useResetCurrentLetterIndex() {
	return usePracticeStore(state => state.resetCurrentLetterIndex);
}
export function useCurrentQuoteIndex() {
	return usePracticeStore(state => state.currentQuoteIndex);
}
export function useIncrementCurrentQuoteIndex() {
	return usePracticeStore(state => state.incrementCurrentQuoteIndex);
}
export function useErrorCount() {
	return usePracticeStore(state => state.errorCount);
}
export function useIncrementErrorCount() {
	return usePracticeStore(state => state.incrementErrorCount);
}
export function useResetErrorCount() {
	return usePracticeStore(state => state.resetErrorCount);
}
export function useAddKey() {
	return usePracticeStore(state => state.addKey);
}
export function useKey(code: string) {
	return usePracticeStore(state => state.keys[code]);
}
export function usePressKey() {
	return usePracticeStore(state => state.pressKey);
}
export function useReleaseKey() {
	return usePracticeStore(state => state.releaseKey);
}
export default usePracticeStore;
