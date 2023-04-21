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

import { useAddStats } from "~/features/stats/hooks/useStatsPersistedStore";

export default function Quote() {
	const { data, fetchNextPage } = useQuotesInfiniteQuery();
	const previousTime = useRef(Date.now());
	const wrontEntries = useRef(new Set<number>());
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

	useEffect(() => {
		resetErrorCount();
		resetCurrentLetterIndex();
	}, []);

	useEffect(() => {
		if (currentQuoteIndex > (data?.pages.length ?? 0) - 2) fetchNextPage();
	}, [currentQuoteIndex]);

	useEffect(() => {
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
		if (event.code === "Tab") event.preventDefault();
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
		if (event.code === "Tab") event.preventDefault();
		releaseKey(event.code);
	};

	return (
		<section
			dir="auto"
			className="my-auto rounded-md border border-gray-300 bg-gray-200 p-8 font-mono text-lg dark:border-hatai-600 dark:bg-hatai-800">
			<input
				type="text"
				className="absolute h-0 w-0"
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				autoFocus
				onBlur={event => event.target.focus()}
			/>
			<p className="mx-auto max-w-[60ch] whitespace-pre-wrap text-center tracking-wide">
				{currentQuote
					.slice(0, currentLetterIndex)
					.split("")
					.map((letter, i) => (
						<span className={wrontEntries.current.has(i) ? "text-red-500" : "text-green-500"}>{letter}</span>
					))}
				<span
					className={`border-b-2 ${!correctPress ? "border-red-500" : "border-black dark:border-gray-100"}`}>
					{currentQuote.at(currentLetterIndex)}
				</span>
				<span>{currentQuote.slice(currentLetterIndex + 1)}</span>
			</p>
			<p className="mt-20 text-right">{data?.pages[currentQuoteIndex].author}</p>
		</section>
	);
}
