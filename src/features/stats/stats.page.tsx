import AnimatedPage from "~/components/animatedPage.component";
import {
	useBestStats,
	useAverageStats,
	useCompletedTests,
	usePracticeDuration,
	useStats,
} from "./hooks/useStatsPersistedStore";
import { Lightning, Gauge, Target, ListChecks, Clock } from "@phosphor-icons/react";
import CalendarHeatmap from "./components/calendarHeatmap.component";
import LineChart from "./components/lineChart.component";
import { startOfYear, addDays, format, getDaysInYear } from "date-fns";
import useMeasure from "react-use-measure";
import TestHistoryList from "./components/testHistoryList.component";

export default function StatsPage() {
	const { bestSpeed } = useBestStats();
	const { averageSpeed, averageAccuracy } = useAverageStats();
	const completedTests = useCompletedTests();
	const practiceDuration = usePracticeDuration();
	const stats = useStats();
	const [heatMapContainerRef, { width: heatMapWidth, height: heatmapHeight }] = useMeasure();
	const [lineChartContainerRef, { width: lineChartWidth, height: lineChartHeight }] = useMeasure();

	const data = Array(getDaysInYear(new Date()))
		.fill(0)
		.map((_, i) => ({
			value: stats[format(addDays(startOfYear(new Date()), i), "yyyyMMdd")]?.speed.length ?? 0,
			date: addDays(startOfYear(new Date()), i),
		}));

	return (
		<AnimatedPage className="grid grid-cols-5 grid-rows-[auto_275px_auto] gap-2 p-4 py-2 lg:grid-rows-[auto_236px_auto]">
			{heatmapHeight && (
				<>
					<div className="flex items-center overflow-hidden rounded-lg bg-gray-200 dark:bg-hatai-800 border-2 dark:border-hatai-700 border-gray-300">
						<Lightning
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p className="text-2xl lg:text-3xl">
								{bestSpeed}
								<span className="text-sm"> wpm</span>
							</p>
							<p className="text-xs text-gray-600 dark:text-gray-400 lg:text-sm">Best Speed</p>
						</div>
					</div>
					<div className="flex items-center overflow-hidden rounded-lg bg-gray-200 dark:bg-hatai-800 border-2 dark:border-hatai-700 border-gray-300">
						<Gauge
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p className="text-2xl lg:text-3xl">
								{averageSpeed}
								<span className="text-sm"> wpm</span>
							</p>
							<p className="text-xs text-gray-600 dark:text-gray-400 lg:text-sm">Average Speed</p>
						</div>
					</div>
					<div className="flex items-center overflow-hidden rounded-lg bg-gray-200 dark:bg-hatai-800 border-2 dark:border-hatai-700 border-gray-300">
						<Target
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p className="text-2xl lg:text-3xl">
								{averageAccuracy}
								<span className="text-sm"> %</span>
							</p>
							<p className="text-xs text-gray-600 dark:text-gray-400 lg:text-sm">Average Accuracy</p>
						</div>
					</div>
					<div className="flex items-center overflow-hidden rounded-lg bg-gray-200 dark:bg-hatai-800 border-2 dark:border-hatai-700 border-gray-300">
						<ListChecks
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p className="text-2xl lg:text-3xl">{completedTests}</p>
							<p className="text-xs text-gray-600 dark:text-gray-400 lg:text-sm">Completed Tests</p>
						</div>
					</div>
					<div className="flex items-center overflow-hidden rounded-lg bg-gray-200 dark:bg-hatai-800 border-2 dark:border-hatai-700 border-gray-300">
						<Clock
							className="box-content h-full bg-gray-300 px-1 text-indigo-600 dark:bg-hatai-600"
							size="34"
							weight="fill"
						/>
						<div className="flex-1 p-2">
							<p className="text-2xl lg:text-3xl">{formatDuration(practiceDuration)}</p>
							<p className="text-xs text-gray-600 dark:text-gray-400 lg:text-sm">Practice Time</p>
						</div>
					</div>
					<div className="col-span-3 flex flex-col rounded-md bg-gray-200 p-4 dark:bg-hatai-800 border-2 dark:border-hatai-700 border-gray-300">
						<h2 className="mb-2 text-xl">Weekly Statistics</h2>
						<div className="flex-1" ref={lineChartContainerRef}>
							<LineChart width={lineChartWidth} height={lineChartHeight} data={data} />
						</div>
					</div>
					<div className="col-span-2 flex flex-col rounded-md bg-gray-200 py-4 dark:bg-hatai-800 border-2 dark:border-hatai-700 border-gray-300">
						<h2 className="mx-4 mb-2 text-xl">Today Tests</h2>
						<TestHistoryList />
					</div>
				</>
			)}
			<div className="col-span-5 rounded-md bg-gray-200 p-4 py-2 dark:bg-hatai-800 border-2 dark:border-hatai-700 border-gray-300">
				<h2 className="mb-2 text-xl">Yearly Activity : {format(new Date(), "yyyy")}</h2>
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
