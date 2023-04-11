import { KeyboardEventHandler, useEffect } from "react";
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
} from "../practice.store";

export default function Quote() {
	const { data, fetchNextPage } = useQuotesInfiniteQuery();

	const currentLetterIndex = useCurrentLetterIndex();
	const incrementCurrentLetterIndex = useIncrementCurrentLetterIndex();
	const resetCurrentLetterIndex = useResetCurrentLetterIndex();

	const currentQuoteIndex = useCurrentQuoteIndex();
	const incrementCurrentQuoteIndex = useIncrementCurrentQuoteIndex();

	const incrementErrorCount = useIncrementErrorCount();
	const resetErrorCount = useResetErrorCount();

	const currentQuote = data?.pages[currentQuoteIndex].content;

	const addKey = useAddKey();
	const removeKey = useRemoveKey();

	useEffect(() => {
		resetErrorCount();
		resetCurrentLetterIndex();
	}, []);

	useEffect(() => {
		if (currentQuoteIndex > (data?.pages.length ?? 0) - 2) fetchNextPage();
	}, [currentQuoteIndex]);

	useEffect(() => {
		if (currentLetterIndex === currentQuote?.length) {
			incrementCurrentQuoteIndex();
			resetErrorCount();
			resetCurrentLetterIndex();
		}
	}, [currentLetterIndex]);

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
		if (event.code === "Tab") event.preventDefault();
		addKey(event.code);
	};

	const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = event => {
		if (event.code === "Tab") event.preventDefault();
		removeKey(event.code);
		if (event.key.length > 1) return;
		if (currentQuote?.at(currentLetterIndex) === event.key) incrementCurrentLetterIndex();
		else incrementErrorCount();
	};

	return (
		<section className="bg-fill-3 p-8 rounded-md mx-auto font-mono text-lg">
			<input
				type="text"
				className="w-0 h-0 absolute"
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				autoFocus
				onBlur={event => event.target.focus()}
			/>
			<p className="tracking-wide w-[60ch] mx-auto text-center whitespace-break-spaces">
				<span className="text-success">{currentQuote?.slice(0, currentLetterIndex)}</span>
				<span className="border-b-2">{currentQuote?.at(currentLetterIndex)}</span>
				<span>{currentQuote?.slice(currentLetterIndex + 1)}</span>
			</p>
			<p className="text-right mt-20">{data?.pages[currentQuoteIndex].author}</p>
		</section>
	);
}
