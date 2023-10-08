import useTestsQuery from "@/hooks/stats/useTestsQuery";
import Stats from "./Stats";
import usePracticeStore from "@/store/usePracticeStore";
import { useEffect } from "react";

export default function OnlineStats() {
  const { data, refetch } = useTestsQuery();
  const { latestSpeed, latestScore, latestAccuracy } = data;
  const errorCount = usePracticeStore((store) => store.errorCount);
  const currentQuoteIndex = usePracticeStore((store) => store.currentQuoteIndex);
  useEffect(() => {
    if (currentQuoteIndex !== 0) refetch();
  }, [currentQuoteIndex]);
  return (
    <Stats
      latestSpeed={latestSpeed}
      latestScore={latestScore}
      latestAccuracy={latestAccuracy}
      errorCount={errorCount}
    />
  );
}
