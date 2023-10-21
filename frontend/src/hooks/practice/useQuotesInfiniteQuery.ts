import axios, { AxiosResponse } from "axios";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

const TOTAL_PAGES = 422;

interface IQuote {
  author: string;
  content: string;
}

export default function useQuotesInfiniteQuery() {
  const select = (data: InfiniteData<AxiosResponse<{ results: IQuote[] }>>) => {
    return {
      pages: data.pages.flatMap((page) =>
        page.data.results.map((result) => ({ author: result.author, content: result.content }))
      ),
      pageParams: [],
    };
  };

  const infiniteQuotesQuery = useInfiniteQuery(["infiniteQuotes"], fetchInfiniteQuotes, {
    select,
    getNextPageParam: getRandomPage,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    suspense: true,
    useErrorBoundary: true,
  });
  return infiniteQuotesQuery;
}

function fetchInfiniteQuotes({ pageParam = getRandomPage() }) {
  return axios.get(`https://api.quotable.io/quotes?limit=5&maxLength=250&page=${pageParam}`);
}

function getRandomPage() {
  return Math.floor(Math.random() * TOTAL_PAGES);
}
