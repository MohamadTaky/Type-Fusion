import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import useQuotesInfiniteQuery from "@/hooks/practice/useQuotesInfiniteQuery";
import usePracticeStore, {
  useCurrentLetterIndex,
  useIncrementCurrentLetterIndex,
  useResetCurrentLetterIndex,
  useCurrentQuoteIndex,
  useIncrementCurrentQuoteIndex,
  useIncrementErrorCount,
  useResetErrorCount,
  useErrorCount,
  usePressKey,
  useReleaseKey,
} from "@/store/usePracticeStore";
import { useTranslation } from "react-i18next";

import { useAddTest } from "@/hooks/stats/useStatsPersistedStore";
import useAddTestMutation from "@/hooks/profile/useAddTestMutation";
import useUserAuthQuery from "@/hooks/auth/useUserAuthQuery.hook";
import { useQueryClient } from "@tanstack/react-query";
import cn from "@/utils/cn";

export default function Quote() {
  const { mutate: addTestMutation } = useAddTestMutation();
  const client = useQueryClient();
  const { data: userAuth } = useUserAuthQuery();
  const { data, fetchNextPage } = useQuotesInfiniteQuery();
  const previousTime = useRef(Date.now());
  const wrontEntries = useRef(new Set<number>());
  const currentLetterIndex = useCurrentLetterIndex();
  const incrementCurrentLetterIndex = useIncrementCurrentLetterIndex();
  const resetCurrentLetterIndex = useResetCurrentLetterIndex();
  const currentQuoteIndex = useCurrentQuoteIndex();
  const currentQuote = data?.pages[currentQuoteIndex].content ?? "";
  const incrementCurrentQuoteIndex = useIncrementCurrentQuoteIndex();
  const incrementErrorCount = useIncrementErrorCount();
  const errorCount = useErrorCount();
  const resetErrorCount = useResetErrorCount();
  const pressKey = usePressKey();
  const releaseKey = useReleaseKey();
  const addTest = useAddTest();
  const [correctPress, setCorrectPress] = useState(true);
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    previousTime.current = Date.now();
    resetCurrentLetterIndex();
    resetErrorCount();
    setCorrectPress(true);
    resetErrorCount();
    resetCurrentLetterIndex();
  }, []);

  useEffect(() => {
    if (currentQuoteIndex > (data?.pages.length ?? 0) - 2) fetchNextPage();
  }, [currentQuoteIndex]);

  useEffect(() => {
    if (currentLetterIndex === 1) previousTime.current = Date.now();
    if (currentLetterIndex !== currentQuote.length) return;

    const practiceDuration = Date.now() - previousTime.current;
    const speed = Math.round((currentQuote.length - errorCount) / 5 / (practiceDuration / 1000 / 60));
    const accuracy = Math.round(((currentQuote.length - errorCount) / currentQuote.length) * 100);
    const score = speed * accuracy;

    if (userAuth) {
      addTestMutation({
        test: {
          speed,
          accuracy,
          score,
          practiceDuration,
          quote: currentQuote,
          errorCount,
          wrongEntries: Array.from(wrontEntries.current),
        },
      });
    } else {
      addTest({
        speed,
        accuracy,
        score,
        practiceDuration,
        quote: currentQuote,
        errorCount,
        wrongEntries: Array.from(wrontEntries.current),
      });
      client.invalidateQueries(["tests"]);
    }

    previousTime.current = Date.now();
    incrementCurrentQuoteIndex();
    resetErrorCount();
    resetCurrentLetterIndex();
    wrontEntries.current.clear();
  }, [currentLetterIndex]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key.length > 1 || usePracticeStore.getState().keys.get(event.code)?.pressed) return;
    incrementCurrentLetterIndex();
    if (currentQuote.at(currentLetterIndex) !== event.key) {
      incrementErrorCount();
      wrontEntries.current.add(currentLetterIndex);
    }
    pressKey(event.code, currentQuote.at(currentLetterIndex) === event.key);
    setCorrectPress(currentQuote.at(currentLetterIndex) === event.key);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => releaseKey(event.code);

  return (
    <section
      onClick={() => {
        inputRef.current?.focus();
        previousTime.current = Date.now();
        resetCurrentLetterIndex();
        resetErrorCount();
        setCorrectPress(true);
      }}
      dir="ltr"
      className="group relative flex min-h-[200px] flex-col gap-4 overflow-hidden rounded-md border border-fill-2 bg-fill-3 p-4 font-mono"
    >
      <input
        ref={inputRef}
        type="text"
        className="absolute h-0 w-0"
        autoFocus
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <p className="mx-auto max-w-[60ch] flex-1 whitespace-pre-wrap text-center tracking-wide">
        {currentQuote
          .slice(0, currentLetterIndex)
          .split("")
          .map((letter, i) => (
            <span key={i} className={wrontEntries.current.has(i) ? "text-error-2" : "text-success-1"}>
              {letter}
            </span>
          ))}
        <span className={cn("border-b-2", !correctPress ? "border-error-2" : "border-black dark:border-white")}>
          {currentQuote.at(currentLetterIndex)}
        </span>
        <span>{currentQuote.slice(currentLetterIndex + 1)}</span>
      </p>
      <p className="text-right">{data?.pages[currentQuoteIndex].author}</p>
      <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-100 backdrop-blur-sm transition group-focus-within:opacity-0">
        {t("test paused, click to continue")}
      </div>
    </section>
  );
}
