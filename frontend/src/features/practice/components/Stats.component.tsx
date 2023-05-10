import { useErrorCount } from "../usePractice.store";
import { useTranslation } from "react-i18next";
import useTestsQuery from "~/features/stats/hooks/useTestsQuery";

export default function Stats() {
	const { data: stats } = useTestsQuery();
	const errorCount = useErrorCount();
	const { t } = useTranslation();

	return (
		<div className="mt-auto flex justify-around rounded-md border border-fill-2 bg-fill-3 p-2 text-sm capitalize">
			<div>
				{t("errors")} : <span className="text-error-2">{errorCount}</span>
			</div>
			<div>
				{t("speed")} :{" "}
				{stats.latestSpeed ? (
					<span>
						{stats.latestSpeed} <span className="text-xs lowercase">{t("wpm")}</span>
					</span>
				) : (
					"N/A"
				)}
			</div>
			<div>
				{t("accuracy")} :{" "}
				{stats.latestAccuracy ? (
					<span dir="ltr">
						{stats.latestAccuracy} <span className="text-xs">%</span>
					</span>
				) : (
					"N/A"
				)}
			</div>
			<div>
				{t("score")} : {stats.latestScore || "N/A"}
			</div>
		</div>
	);
}
