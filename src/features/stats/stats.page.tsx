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
		<AnimatedPage className="grid grid-cols-5 grid-rows-[auto_275px_auto] lg:grid-rows-[auto_236px_auto]  gap-2 p-4">
			{heatmapHeight && (
				<>
					<div className="bg-fill-3 rounded-lg overflow-hidden flex items-center">
						<Lightning className="bg-fill-1 h-full box-content px-1 text-accent-2" size="34" weight="fill" />
						<div className="p-2 flex-1">
							<p className="text-2xl lg:text-3xl">
								{bestSpeed}
								<span className="text-sm"> wpm</span>
							</p>
							<p className="text-2 text-xs lg:text-sm">Best Speed</p>
						</div>
					</div>
					<div className="bg-fill-3 rounded-lg overflow-hidden flex items-center">
						<Gauge className="bg-fill-1 h-full box-content px-1 text-accent-2" size="34" weight="fill" />
						<div className="p-2 flex-1">
							<p className="text-2xl lg:text-3xl">
								{averageSpeed}
								<span className="text-sm"> wpm</span>
							</p>
							<p className="text-2 text-xs lg:text-sm">Average Speed</p>
						</div>
					</div>
					<div className="bg-fill-3 rounded-lg overflow-hidden flex items-center">
						<Target className="bg-fill-1 h-full box-content px-1 text-accent-2" size="34" weight="fill" />
						<div className="p-2 flex-1">
							<p className="text-2xl lg:text-3xl">
								{averageAccuracy}
								<span className="text-sm"> %</span>
							</p>
							<p className="text-2 text-xs lg:text-sm">Average Accuracy</p>
						</div>
					</div>
					<div className="bg-fill-3 rounded-lg overflow-hidden flex items-center">
						<ListChecks className="bg-fill-1 h-full box-content px-1 text-accent-2" size="34" weight="fill" />
						<div className="p-2 flex-1">
							<p className="text-2xl lg:text-3xl">{completedTests}</p>
							<p className="text-2 text-xs lg:text-sm">Completed Tests</p>
						</div>
					</div>
					<div className="bg-fill-3 rounded-lg overflow-hidden flex items-center">
						<Clock className="bg-fill-1 h-full box-content px-1 text-accent-2" size="34" weight="fill" />
						<div className="p-2 flex-1">
							<p className="text-2xl lg:text-3xl">{formatDuration(practiceDuration)}</p>
							<p className="text-2 text-xs lg:text-sm">Practice Time</p>
						</div>
					</div>
					<div className="p-4 bg-fill-3 rounded-md col-span-3 flex flex-col">
						<h2 className="text-xl mb-2">Weekly Statistics</h2>
						<div className="flex-1" ref={lineChartContainerRef}>
							<LineChart width={lineChartWidth} height={lineChartHeight} data={data} />
						</div>
					</div>
					<div className="py-4 bg-fill-3 rounded-md col-span-2 flex flex-col">
						<h2 className="mx-4 mb-2 text-xl">Today Tests</h2>
						<TestHistoryList />
					</div>
				</>
			)}
			<div className="p-4 py-2 bg-fill-3 rounded-md col-span-5">
				<h2 className="text-xl mb-2">Yearly Activity : {format(new Date(), "yyyy")}</h2>
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
