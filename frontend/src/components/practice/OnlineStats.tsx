import request from "@/libraries/axios/axiosInterceptor";
import usePracticeStore from "@/store/usePracticeStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Stats from "./Stats";

export default function OnlineStats() {
  const { data, refetch } = useQuery(["tests"], getTests, {
    select: (data) => data.data,
    suspense: true,
  });
  const errorCount = usePracticeStore((store) => store.errorCount);
  const currentQuoteIndex = usePracticeStore((store) => store.currentQuoteIndex);
  useEffect(() => {
    if (currentQuoteIndex !== 0) refetch();
  }, [currentQuoteIndex]);
  return (
    <Stats
      latestSpeed={data?.latestSpeed}
      latestScore={data?.latestScore}
      latestAccuracy={data?.latestAccuracy}
      errorCount={errorCount}
    />
  );
}

async function getTests() {
  return request({ url: "/api/data", withCredentials: true });
}
