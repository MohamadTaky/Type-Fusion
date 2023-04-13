import { create } from "zustand";

interface PracticeStore {
	pressedKeys: Set<string>;
	addKey: (key: string) => void;
	removeKey: (key: string) => void;
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
	pressedKeys: new Set(),
	addKey: key => set(state => ({ ...state, pressedKeys: new Set(state.pressedKeys).add(key) })),
	removeKey: key =>
		set(state => {
			const newPressedKeys = state.pressedKeys;
			newPressedKeys.delete(key);
			return {
				...state,
				pressedKeys: newPressedKeys,
			};
		}),
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
}));

export function usePressedKeys() {
	return usePracticeStore(state => state.pressedKeys);
}
export function useAddKey() {
	return usePracticeStore(state => state.addKey);
}
export function useRemoveKey() {
	return usePracticeStore(state => state.removeKey);
}
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
export default usePracticeStore;
