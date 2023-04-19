import { extent, line, NumberValue, scaleLinear, curveMonotoneX } from "d3";
import { useStats } from "../hooks/useStatsPersistedStore";
import { startOfWeek, addDays, format } from "date-fns";
import { motion } from "framer-motion";

interface IProps {
	width: number;
	height: number;
	data: any;
}

export default function LineChart({ width, height }: IProps) {
	const margins = {
		top: 10,
		right: 10,
		bottom: 20,
		left: 20,
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
		.range([margins.left, width - margins.right]);

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
			{yScale.ticks(yScale.domain()[1]).map(tick => (
				<g transform={`translate(0 ${yScale(tick)})`}>
					<text fill="currentColor" alignmentBaseline="middle" x={margins.left - 20}>
						{tick}
					</text>
				</g>
			))}
			<line
				x1={margins.left}
				y1={margins.top}
				x2={margins.left}
				y2={height - margins.bottom}
				stroke="currentColor"
				strokeWidth="1"
			/>
			<line
				x1={margins.left}
				y1={height - margins.bottom}
				x2={width - margins.right}
				y2={height - margins.bottom}
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
				className="stroke-accent-2 fill-none"
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
							className="fill-accent-1 stroke-fill-3"
						/>
					)
			)}
		</svg>
	);
}
