import Stats from "@/components/practice/Stats";
import useStatsPersistedStore from "@/hooks/stats/useStatsPersistedStore";
import usePracticeStore from "@/store/usePracticeStore";

export default function OfflineStats() {
  const latestSpeed = useStatsPersistedStore((store) => store.latestSpeed);
  const latestAccuracy = useStatsPersistedStore((store) => store.latestAccuracy);
  const latestScore = useStatsPersistedStore((store) => store.latestScore);
  const errorCount = usePracticeStore((store) => store.errorCount);

  return (
    <Stats
      latestSpeed={latestSpeed}
      latestAccuracy={latestAccuracy}
      latestScore={latestScore}
      errorCount={errorCount}
    />
  );
}
