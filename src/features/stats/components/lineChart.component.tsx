import { extent, line, NumberValue, scaleLinear, curveMonotoneX } from "d3";
import { useStats } from "../hooks/useStatsPersistedStore";
import { startOfWeek, addDays, format } from "date-fns";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface IProps {
	width: number;
	height: number;
	data: any;
}

export default function LineChart({ width, height }: IProps) {
	const { i18n } = useTranslation();
	const isRtl = i18n.language === "ar";

	const margins = {
		top: 10,
		right: isRtl ? 20 : 10,
		bottom: 20,
		left: isRtl ? 10 : 20,
	};

	const stats = useStats();
	const week = Array(7)
		.fill(0)
		.map((_, i) => ({
			date: i,
			value: stats[format(addDays(startOfWeek(new Date()), i), "yyyyMMdd")]?.speed.length ?? 0,
		}));

	const xScale = scaleLinear()
		.domain([0, 6])
		.range(isRtl ? [width - margins.right, margins.left] : [margins.left, width - margins.right]);
	const yScale = scaleLinear()
		.domain(extent(week.map(day => day.value)) as Iterable<NumberValue>)
		.range([height - margins.bottom, margins.top]);

	const l = line()
		.x(d => xScale(d[0]))
		.y(d => yScale(d[1]))
		.curve(curveMonotoneX);
	const d = l(week.map(day => [day.date, day.value])) as string;

	return (
		<svg width={width} height={height} className="text-[10px]">
			{yScale.ticks(5).map(tick => (
				<g transform={`translate(0 ${yScale(tick)})`}>
					<text fill="currentColor" alignmentBaseline="middle" x={xScale(0) + (isRtl ? 20 : -20)}>
						{tick}
					</text>
				</g>
			))}
			<line
				x1={xScale(0)}
				y1={margins.top}
				x2={xScale(0)}
				y2={height - margins.bottom}
				stroke="currentColor"
				strokeWidth="1"
			/>
			<line
				x1={margins.left}
				y1={yScale(0)}
				x2={width - margins.right}
				y2={yScale(0)}
				stroke="currentColor"
				strokeWidth="1"
			/>

			{xScale.ticks(7).map(tick => (
				<g transform={`translate(${xScale(tick)})`}>
					<text textAnchor="middle" fill="currentColor" y={height - margins.bottom + 20}>
						{format(addDays(startOfWeek(new Date()), tick), "E")}
					</text>
				</g>
			))}

			<motion.path
				initial={{ strokeDashoffset: 1 }}
				animate={{ strokeDashoffset: 0 }}
				transition={{ duration: 1, delay: 0.15 + 0.2 }}
				d={d}
				className="fill-none stroke-indigo-600"
				strokeWidth="2"
				pathLength="1"
				strokeDasharray="1"
			/>

			{week.map(
				(day, i) =>
					day.value && (
						<motion.circle
							transition={{ type: "spring", delay: 0.15 + (i / (week.length - 1)) * 0.2 }}
							animate={{ r: [0, 7] }}
							cx={xScale(day.date)}
							cy={yScale(day.value)}
							strokeWidth="3"
							className="fill-indigo-600 stroke-gray-200 dark:stroke-hatai-800"
						/>
					)
			)}
		</svg>
	);
}
