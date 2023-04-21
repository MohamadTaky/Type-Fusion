import TestHistoryItem from "./testHistoryItem.component";
import { useStats } from "../hooks/useStatsPersistedStore";
import { format } from "date-fns";

export default function TestHistoryList() {
	const stats = useStats();
	const today = stats[format(new Date(), "yyyyMMdd")];

	return (
		<ul className="custom-scroll flex-1 overflow-auto px-4">
			{stats[format(new Date(), "yyyyMMdd")]?.tests.map((test, i) => (
				<TestHistoryItem
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeInOut", delay: 0.15 + i * 0.1 }}
					test={test}
					speed={today.speed[i]}
					accuracy={today.accuracy[i]}
					errors={today.errors[i]}
					wrongEntries={today.wrongEntries[i]}
				/>
			))}
		</ul>
	);
}
