import TestHistoryItem from "./testHistoryItem.component";
import { useStats } from "../hooks/useStatsPersistedStore";
import { format } from "date-fns";
import { Info } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export default function TestHistoryList() {
	const stats = useStats();
	const today = stats[format(new Date(), "yyyyMMdd")];
	const { t } = useTranslation();

	return (
		<ul className="custom-scroll relative flex-1 overflow-auto px-4">
			{stats[format(new Date(), "yyyyMMdd")]?.tests.map((test, i) => (
				<TestHistoryItem
					key={`history${test}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeInOut", delay: 0.15 + i * 0.1 }}
					test={test}
					speed={today.speed[i]}
					accuracy={today.accuracy[i]}
					errors={today.errors[i]}
					wrongEntries={today.wrongEntries[i]}
				/>
			)) ?? (
				<div className="mx-auto mt-6 text-center text-gray-600 dark:text-gray-400">
					<Info size="50" weight="fill" className="mx-auto" />
					<p className="first-letter:capitalize">{t("no completed tests today")}</p>
				</div>
			)}
		</ul>
	);
}
