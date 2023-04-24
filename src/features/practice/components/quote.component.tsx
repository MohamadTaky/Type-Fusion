import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import useQuotesInfiniteQuery from "../hooks/useQuotesInfiniteQuery";
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
} from "../usePractice.store";
import { useTranslation } from "react-i18next";

import { useAddStats } from "~/features/stats/hooks/useStatsPersistedStore";

export default function Quote() {
	const { data, fetchNextPage } = useQuotesInfiniteQuery();
	const previousTime = useRef(Date.now());
	const wrontEntries = useRef(new Set<number>());
	const parentRef = useRef<HTMLDivElement>(null);
	const currentLetterIndex = useCurrentLetterIndex();
	const incrementCurrentLetterIndex = useIncrementCurrentLetterIndex();
	const resetCurrentLetterIndex = useResetCurrentLetterIndex();
	const currentQuoteIndex = useCurrentQuoteIndex();
	const currentQuote = data?.pages[currentQuoteIndex].content as string;
	const incrementCurrentQuoteIndex = useIncrementCurrentQuoteIndex();
	const incrementErrorCount = useIncrementErrorCount();
	const errorCount = useErrorCount();
	const resetErrorCount = useResetErrorCount();
	const pressKey = usePressKey();
	const releaseKey = useReleaseKey();
	const addStats = useAddStats();
	const [correctPress, setCorrectPress] = useState(true);
	const [isFocused, setIsFocused] = useState(true);
	const { t } = useTranslation();

	useEffect(() => {
		resetErrorCount();
		resetCurrentLetterIndex();
		parentRef.current?.focus();
	}, []);

	useEffect(() => {
		previousTime.current = Date.now();
		resetCurrentLetterIndex();
		resetErrorCount();
		setCorrectPress(true);
	}, [isFocused]);

	useEffect(() => {
		if (currentQuoteIndex > (data?.pages.length ?? 0) - 2) fetchNextPage();
	}, [currentQuoteIndex]);

	useEffect(() => {
		if (currentLetterIndex === 1) previousTime.current = Date.now();
		if (currentLetterIndex !== currentQuote.length) return;

		const duration = Date.now() - previousTime.current;
		const speed = Math.round((currentQuote.length - errorCount) / 5 / (duration / 1000 / 60));
		const accuracy = Math.round(((currentQuote.length - errorCount) / currentQuote.length) * 100);
		const score = speed * accuracy;
		addStats({
			speed,
			accuracy,
			score,
			duration,
			test: currentQuote,
			errors: errorCount,
			wrongEntries: Array.from(wrontEntries.current),
		});
		previousTime.current = Date.now();
		incrementCurrentQuoteIndex();
		resetErrorCount();
		resetCurrentLetterIndex();
		wrontEntries.current.clear();
	}, [currentLetterIndex]);

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
		if (event.key.length > 1 || usePracticeStore.getState().keys[event.code].pressed) return;
		else if (currentQuote.at(currentLetterIndex) === event.key) incrementCurrentLetterIndex();
		else {
			incrementErrorCount();
			wrontEntries.current.add(currentLetterIndex);
		}
		pressKey(event.code, currentQuote.at(currentLetterIndex) === event.key);
		setCorrectPress(currentQuote.at(currentLetterIndex) === event.key);
	};

	const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = event => {
		releaseKey(event.code);
	};

	return (
		<section
			dir="ltr"
			className="relative min-h-[200px] overflow-hidden rounded-md border border-gray-300 bg-gray-200 font-mono dark:border-hatai-600 dark:bg-hatai-800">
			<span
				className={`pointer-events-none absolute inset-x-0 bottom-6 grid place-items-center font-sans text-sm transition-opacity
				${isFocused ? "opacity-0" : ""}`}>
				{t("test paused, click to continue")}
			</span>
			<div
				ref={parentRef}
				tabIndex={0}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				className={`flex h-full flex-col justify-between p-4 blur-md transition focus:outline-none focus:blur-none`}>
				<p className="mx-auto max-w-[60ch] whitespace-pre-wrap text-center tracking-wide">
					{currentQuote
						.slice(0, currentLetterIndex)
						.split("")
						.map((letter, i) => (
							<span key={i} className={wrontEntries.current.has(i) ? "text-red-500" : "text-green-500"}>
								{letter}
							</span>
						))}
					<span
						className={`border-b-2 
						${!correctPress ? "border-red-500" : "border-black dark:border-gray-100"}`}>
						{currentQuote.at(currentLetterIndex)}
					</span>
					<span>{currentQuote.slice(currentLetterIndex + 1)}</span>
				</p>
				<p className="text-right">{data?.pages[currentQuoteIndex].author}</p>
			</div>
		</section>
	);
}
