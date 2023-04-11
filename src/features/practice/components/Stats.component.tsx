import { useErrorCount, useSpeed, useAccuracy } from "../practice.store";

export default function Stats() {
	const errorCount = useErrorCount();
	const speed = useSpeed();
	const accuracy = useAccuracy();
	return (
		<div className="bg-fill-3 p-2 rounded-md flex justify-around text-sm">
			<div>
				Errors : <span className="text-failure-1">{errorCount}</span>
			</div>
			<div>Speed: {speed || "N/A"}</div>
			<div>Accuracy: {accuracy || "N/A"}</div>
		</div>
	);
}
