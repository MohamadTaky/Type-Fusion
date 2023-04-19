import TestHistoryItem from "./testHistoryItem.component";
import { useStats } from "../hooks/useStatsPersistedStore";
import { format } from "date-fns";

export default function TestHistoryList() {
	const stats = useStats();
	const today = stats[format(new Date(), "yyyyMMdd")];
	return (
		<ul className="flex-1 px-4 overflow-auto custom-scroll">
			{stats[format(new Date(), "yyyyMMdd")]?.tests.map((test, i) => (
				<TestHistoryItem
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeInOut", delay: 0.15 + i * 0.1 }}
					test={test}
					speed={today.speed[i]}
					accuracy={today.accuracy[i]}
					errors={today.errors[i]}
				/>
			))}
			{stats[format(new Date(), "yyyyMMdd")]?.tests.map((test, i) => (
				<TestHistoryItem
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeInOut", delay: 0.15 + i * 0.1 }}
					test={test}
					speed={today.speed[i]}
					accuracy={today.accuracy[i]}
					errors={today.errors[i]}
				/>
			))}
			{stats[format(new Date(), "yyyyMMdd")]?.tests.map((test, i) => (
				<TestHistoryItem
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeInOut", delay: 0.15 + i * 0.1 }}
					test={test}
					speed={today.speed[i]}
					accuracy={today.accuracy[i]}
					errors={today.errors[i]}
				/>
			))}
			
		</ul>
	);
}
