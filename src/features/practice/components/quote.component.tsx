import { KeyboardEventHandler, useEffect, useRef } from "react";
import useQuotesInfiniteQuery from "../hooks/useQuotesInfiniteQuery";
import {
	useAddKey,
	useRemoveKey,
	useCurrentLetterIndex,
	useIncrementCurrentLetterIndex,
	useResetCurrentLetterIndex,
	useCurrentQuoteIndex,
	useIncrementCurrentQuoteIndex,
	useIncrementErrorCount,
	useResetErrorCount,
	useErrorCount,
} from "../practice.store";

import { useAddStats } from "~/features/stats/hooks/useStatsPersistedStore";

export default function Quote() {
	const { data, fetchNextPage } = useQuotesInfiniteQuery();
	const previousTime = useRef(Date.now());
	const currentLetterIndex = useCurrentLetterIndex();
	const incrementCurrentLetterIndex = useIncrementCurrentLetterIndex();
	const resetCurrentLetterIndex = useResetCurrentLetterIndex();
	const currentQuoteIndex = useCurrentQuoteIndex();
	const currentQuote = data?.pages[currentQuoteIndex].content;
	const incrementCurrentQuoteIndex = useIncrementCurrentQuoteIndex();
	const incrementErrorCount = useIncrementErrorCount();
	const errorCount = useErrorCount();
	const resetErrorCount = useResetErrorCount();
	const addKey = useAddKey();
	const removeKey = useRemoveKey();
	const addStats = useAddStats();

	useEffect(() => {
		resetErrorCount();
		resetCurrentLetterIndex();
	}, []);

	useEffect(() => {
		if (currentQuoteIndex > (data?.pages.length ?? 0) - 2) fetchNextPage();
	}, [currentQuoteIndex]);

	useEffect(() => {
		if (currentLetterIndex !== currentQuote?.length) return;
		const stats = calculateStats(
			currentQuote.length,
			(Date.now() - previousTime.current) / 1000 / 60,
			errorCount
		);
		addStats(stats);
		previousTime.current = Date.now();
		incrementCurrentQuoteIndex();
		resetErrorCount();
		resetCurrentLetterIndex();
	}, [currentLetterIndex]);

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
		if (event.code === "Tab") event.preventDefault();
		addKey(event.code);
	};

	const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = event => {
		if (event.code === "Tab") event.preventDefault();
		removeKey(event.code);
		if (event.key.length > 1) return;
		else if (currentQuote?.at(currentLetterIndex) === event.key) incrementCurrentLetterIndex();
		else incrementErrorCount();
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
				<span className="text-success">{currentQuote?.slice(0, currentLetterIndex)}</span>
				<span className="border-b-2">{currentQuote?.at(currentLetterIndex)}</span>
				<span>{currentQuote?.slice(currentLetterIndex + 1)}</span>
			</p>
			<p className="text-right mt-20">{data?.pages[currentQuoteIndex].author}</p>
		</section>
	);
}

function calculateStats(letters: number, time: number, errors: number) {
	const speed = Math.round((letters - errors) / time);
	const accuracy = Math.round(((letters - errors) / letters) * 100);
	const score = speed * accuracy;
	return {
		speed,
		accuracy,
		score,
	};
}
