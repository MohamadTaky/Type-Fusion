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
		addStats({ speed, accuracy, score, duration, test: currentQuote, errors: errorCount });
		previousTime.current = Date.now();
		incrementCurrentQuoteIndex();
		resetErrorCount();
		resetCurrentLetterIndex();
	}, [currentLetterIndex]);

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
		if (event.code === "Tab") event.preventDefault();
		if (event.key.length > 1 || usePracticeStore.getState().keys[event.code].pressed) return;
		else if (currentQuote?.at(currentLetterIndex) === event.key) incrementCurrentLetterIndex();
		else incrementErrorCount();
		pressKey(event.code, currentQuote?.at(currentLetterIndex) === event.key);
		setCorrectPress(currentQuote?.at(currentLetterIndex) === event.key);
	};

	const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = event => {
		if (event.code === "Tab") event.preventDefault();
		releaseKey(event.code);
	};

	return (
		<section className="bg-fill-3 p-8 rounded-md font-mono text-lg my-auto">
			<input
				type="text"
				className="w-0 h-0 absolute"
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				autoFocus
				onBlur={event => event.target.focus()}
			/>
			<p className="tracking-wide max-w-[60ch] text-center mx-auto whitespace-pre-wrap">
				<span className="text-success-1">{currentQuote?.slice(0, currentLetterIndex)}</span>
				<span
					className={`border-b-2 transition-colors duration-100 ${!correctPress ? "border-failure-1" : ""}`}>
					{currentQuote?.at(currentLetterIndex)}
				</span>
				<span>{currentQuote?.slice(currentLetterIndex + 1)}</span>
			</p>
			<p className="text-right mt-20">{data?.pages[currentQuoteIndex].author}</p>
		</section>
	);
}
