import { useErrorCount } from "../usePractice.store";
import { useLatestStats } from "~/features/stats/hooks/useStatsPersistedStore";

export default function Stats() {
	const { speed, accuracy, score } = useLatestStats();
	const errorCount = useErrorCount();

	return (
		<div className="flex justify-around rounded-md border-2 border-gray-300 bg-gray-200 p-2 text-sm dark:border-hatai-700 dark:bg-hatai-800">
			<div>
				Errors : <span className="text-red-500">{errorCount}</span>
			</div>
			<div>
				Speed: {speed || "N/A"} <span className="text-xs">wpm</span>
			</div>
			<div>
				Accuracy: {accuracy || "N/A"}
				<span className="text-xs">%</span>
			</div>
			<div>Score: {score || "N/A"}</div>
		</div>
	);
}
