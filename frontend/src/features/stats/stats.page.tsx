import AnimatedPage from "~/common/components/animatedPage.component";
import { Lightning, Gauge, Target, ListChecks, Clock } from "@phosphor-icons/react";
import CalendarHeatmap from "./components/calendarHeatmap.component";
import LineChart from "./components/lineChart.component";
import { startOfYear, addDays, format, getDaysInYear } from "date-fns";
import useMeasure from "react-use-measure";
import TestHistoryList from "./components/testHistoryList.component";
import { useTranslation } from "react-i18next";

import useTestsQuery from "./hooks/useTestsQuery";

export default function StatsPage() {
	const [heatMapContainerRef, { width: heatMapWidth, height: heatmapHeight }] = useMeasure();
	const [lineChartContainerRef, { width: lineChartWidth, height: lineChartHeight }] = useMeasure();
	const { t } = useTranslation();

	const { data: stats } = useTestsQuery();

	const data = Array(getDaysInYear(new Date()))
		.fill(0)
		.map((_, i) => ({
			value: stats.tests[format(addDays(startOfYear(new Date()), i), "yyyyMMdd")]?.speed.length ?? 0,
			date: addDays(startOfYear(new Date()), i),
		}));

	return (
		<AnimatedPage className="grid grid-cols-5 grid-rows-[auto_275px_auto] gap-2 p-4 lg:grid-rows-[auto_236px_auto]">
			{heatmapHeight && (
				<>
					<div className="flex items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-200 dark:border-hatai-600 dark:bg-hatai-800">
						<Lightning
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p className="text-2xl lg:text-3xl">
								{stats.bestSpeed}
								<span className="text-sm"> {t("wpm")}</span>
							</p>
							<p className="text-xs capitalize text-secondary lg:text-sm">{t("best speed")}</p>
						</div>
					</div>
					<div className="flex items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-200 dark:border-hatai-600 dark:bg-hatai-800">
						<Gauge
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p className="text-2xl lg:text-3xl">
								{stats.averageSpeed}
								<span className="text-sm"> {t("wpm")}</span>
							</p>
							<p className="text-xs capitalize text-secondary lg:text-sm">{t("average speed")}</p>
						</div>
					</div>
					<div className="flex items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-200 dark:border-hatai-600 dark:bg-hatai-800">
						<Target
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p dir="ltr" className="w-fit text-2xl lg:text-3xl">
								{stats.averageAccuracy}
								<span className="text-sm"> %</span>
							</p>
							<p className="text-xs capitalize text-secondary lg:text-sm">{t("average accuracy")}</p>
						</div>
					</div>
					<div className="flex items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-200 dark:border-hatai-600 dark:bg-hatai-800">
						<ListChecks
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p className="text-2xl lg:text-3xl">{stats.completedTests}</p>
							<p className="text-xs capitalize text-secondary lg:text-sm">{t("completed tests")}</p>
						</div>
					</div>
					<div className="flex items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-200 dark:border-hatai-600 dark:bg-hatai-800">
						<Clock
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p className="text-2xl lg:text-3xl">{formatDuration(stats.practiceDuration)}</p>
							<p className="text-xs capitalize text-secondary lg:text-sm">{t("practice time")}</p>
						</div>
					</div>
					<div className="col-span-3 flex flex-col rounded-md border border-gray-300 bg-gray-200 p-4 dark:border-hatai-600 dark:bg-hatai-800">
						<h2 className="mb-2 text-xl capitalize">{t("weekly statistics")}</h2>
						<div className="max-h-full flex-1" ref={lineChartContainerRef}>
							<LineChart width={lineChartWidth} height={lineChartHeight} />
						</div>
					</div>
					<div className="col-span-2 flex flex-col rounded-md border border-gray-300 bg-gray-200 py-4 dark:border-hatai-600 dark:bg-hatai-800">
						<h2 className="mx-4 mb-2 text-xl capitalize">{t("today tests")}</h2>
						<TestHistoryList />
					</div>
				</>
			)}
			<div className="col-span-5 rounded-md border border-gray-300 bg-gray-200 p-4 py-2 dark:border-hatai-600 dark:bg-hatai-800">
				<h2 className="mb-2 text-xl capitalize">
					{t("yearly activity")} : {format(new Date(), "yyyy")}
				</h2>
				<div ref={heatMapContainerRef}>
					<CalendarHeatmap data={data} width={heatMapWidth} />
				</div>
			</div>
		</AnimatedPage>
	);
}

function formatDuration(duration: number) {
	const hours = Math.floor(duration / 3600000);
	const minutes = Math.floor((duration % 3600000) / 60000);
	const seconds = Math.floor((duration % 60000) / 1000);
	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;
}
