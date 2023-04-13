import { useErrorCount } from "../practice.store";
import { useLatestStats } from "~/features/stats/hooks/useStatsPersistedStore";

export default function Stats() {
	const { speed, accuracy, score } = useLatestStats();
	const errorCount = useErrorCount();

	return (
		<div className="bg-fill-3 p-2 rounded-md flex justify-around text-sm">
			<div>
				Errors : <span className="text-failure-1">{errorCount}</span>
			</div>
			<div>Speed: {speed || "N/A"}</div>
			<div>Accuracy: {accuracy || "N/A"}</div>
			<div>Score: {score || "N/A"}</div>
		</div>
	);
}
