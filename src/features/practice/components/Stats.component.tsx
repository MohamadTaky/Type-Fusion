import { useErrorCount } from "../practice.store";

export default function Stats() {
	const errorCount = useErrorCount();
	return (
		<div>
			<div>
				Errors : <span className="text-failure-1">{errorCount}</span>
			</div>
		</div>
	);
}
