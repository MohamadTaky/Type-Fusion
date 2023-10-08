import { create } from "zustand";
import keyboardMap from "./keyboardMap.json";

type PracticeStoreStates = {
  keys: Map<string, { pressed: boolean; correct: boolean }>;
  currentLetterIndex: number;
  currentQuoteIndex: number;
  errorCount: number;
};
type PracticeStoreActions = {
  pressKey: (code: string, correct: boolean) => void;
  releaseKey: (code: string) => void;
  incrementCurrentLetterIndex: () => void;
  resetCurrentLetterIndex: () => void;
  incrementCurrentQuoteIndex: () => void;
  incrementErrorCount: () => void;
  resetErrorCount: () => void;
};

function getInititalPracticeStore(): PracticeStoreStates {
  return {
    currentLetterIndex: 0,
    currentQuoteIndex: 0,
    errorCount: 0,
    keys: new Map(keyboardMap as Iterable<[string, { pressed: boolean; correct: boolean }]>),
  };
}

type PracticeStore = PracticeStoreStates & PracticeStoreActions;

const usePracticeStore = create<PracticeStore>()((set) => ({
  incrementCurrentLetterIndex: () => set((state) => ({ ...state, currentLetterIndex: state.currentLetterIndex + 1 })),
  resetCurrentLetterIndex: () => set((state) => ({ ...state, currentLetterIndex: 0 })),
  incrementCurrentQuoteIndex: () => set((state) => ({ ...state, currentQuoteIndex: state.currentQuoteIndex + 1 })),
  incrementErrorCount: () => set((state) => ({ ...state, errorCount: state.errorCount + 1 })),
  resetErrorCount: () => set((state) => ({ ...state, errorCount: 0 })),
  pressKey: (code, correct) =>
    set((state) => ({
      ...state,
      keys: new Map(state.keys).set(code, {
        pressed: true,
        correct,
      }),
    })),
  releaseKey: (code) =>
    set((state) => ({
      ...state,
      keys: new Map(state.keys).set(code, {
        pressed: false,
        correct: false,
      }),
    })),
  ...getInititalPracticeStore(),
}));

export function useCurrentLetterIndex() {
  return usePracticeStore((state) => state.currentLetterIndex);
}
export function useIncrementCurrentLetterIndex() {
  return usePracticeStore((state) => state.incrementCurrentLetterIndex);
}
export function useResetCurrentLetterIndex() {
  return usePracticeStore((state) => state.resetCurrentLetterIndex);
}
export function useCurrentQuoteIndex() {
  return usePracticeStore((state) => state.currentQuoteIndex);
}
export function useIncrementCurrentQuoteIndex() {
  return usePracticeStore((state) => state.incrementCurrentQuoteIndex);
}
export function useErrorCount() {
  return usePracticeStore((state) => state.errorCount);
}
export function useIncrementErrorCount() {
  return usePracticeStore((state) => state.incrementErrorCount);
}
export function useResetErrorCount() {
  return usePracticeStore((state) => state.resetErrorCount);
}
export function useKey(code: string) {
  return usePracticeStore((state) => state.keys.get(code));
}
export function usePressKey() {
  return usePracticeStore((state) => state.pressKey);
}
export function useReleaseKey() {
  return usePracticeStore((state) => state.releaseKey);
}
export default usePracticeStore;
