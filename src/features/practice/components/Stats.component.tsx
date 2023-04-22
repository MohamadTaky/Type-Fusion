import { useErrorCount } from "../usePractice.store";
import { useLatestStats } from "~/features/stats/hooks/useStatsPersistedStore";
import { useTranslation } from "react-i18next";

export default function Stats() {
	const { speed, accuracy, score } = useLatestStats();
	const errorCount = useErrorCount();
	const { t } = useTranslation();

	return (
		<div className="flex justify-around rounded-md border border-gray-300 bg-gray-200 p-2 text-sm capitalize dark:border-hatai-600 dark:bg-hatai-800">
			<div>
				{t("errors")} : <span className="text-red-500">{errorCount}</span>
			</div>
			<div>
				{t("speed")} :{" "}
				{speed ? (
					<span>
						{speed} <span className="text-xs lowercase">{t("wpm")}</span>
					</span>
				) : (
					"N/A"
				)}
			</div>
			<div>
				{t("accuracy")} :{" "}
				{accuracy ? (
					<span dir="ltr">
						{accuracy} <span className="text-xs">%</span>
					</span>
				) : (
					"N/A"
				)}
			</div>
			<div>
				{t("score")} : {score || "N/A"}
			</div>
		</div>
	);
}
