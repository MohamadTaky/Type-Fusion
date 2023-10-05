import { curveMonotoneX, extent, line, scaleLinear } from "d3";
import { addDays, format, startOfWeek } from "date-fns";
import { motion } from "framer-motion";
import { useRef } from "react";
import useMeasure from "react-use-measure";
import useTestsQuery from "~/hooks/stats/useTestsQuery";

interface IProps {
	width: number;
	height: number;
	ySpacing?: number;
	xSpacing?: number;
}

export default function LineChart({ width, height, ySpacing = 5, xSpacing = 10 }: IProps) {
	const parentRef = useRef<SVGSVGElement>(null);
	const isRtl =
		parentRef.current && window.getComputedStyle(parentRef.current).getPropertyValue("direction") === "rtl";

	const [weekLabelRef, { height: weekLabelHeight, width: weekLabelWidth }] = useMeasure();
	const [tickRef, { width: tickWidth, height: tickHeight }] = useMeasure();

	const { data: stats } = useTestsQuery();
	const week = Array(7)
		.fill(0)
		.map((_, i) => ({
			date: i,
			value: stats.tests[format(addDays(startOfWeek(new Date()), i), "yyyyMMdd")]?.speed.length ?? 0,
		}));

	const xScale = scaleLinear()
		.domain([0, 6])
		.range(
			isRtl
				? [width - weekLabelWidth - xSpacing, weekLabelWidth / 2]
				: [tickWidth + xSpacing, width - weekLabelWidth / 2]
		);
	const yScale = scaleLinear()
		.domain(extent(week.map(day => day.value)) as Iterable<number>)
		.range([height - weekLabelHeight - ySpacing, tickHeight / 2]);

	const l = line()
		.x(d => xScale(d[0]))
		.y(d => yScale(d[1]))
		.curve(curveMonotoneX);
	const d = l(week.map(day => [day.date, day.value])) as string;

	return (
		<svg ref={parentRef} width="100%" height="100%" className="text-[10px]">
			{yScale
				.ticks()
				.filter(tick => tick % 1 === 0)
				.map(tick => (
					<text
						key={`lineY${tick}`}
						ref={tickRef}
						fill="currentColor"
						alignmentBaseline="middle"
						x={xScale(0) + (isRtl ? weekLabelWidth / 2 + tickWidth + xSpacing : -tickWidth - xSpacing)}
						y={yScale(tick)}>
						{tick}
					</text>
				))}
			<g stroke="currentColor" strokeWidth="1">
				<line x1={xScale.range()[0]} y1={yScale.range()[1]} x2={xScale.range()[0]} y2={yScale.range()[0]} />
				<line x1={xScale.range()[0]} y1={yScale.range()[0]} x2={xScale.range()[1]} y2={yScale.range()[0]} />
			</g>
			{xScale.ticks(7).map(tick => (
				<text
					key={`lineX${tick}`}
					ref={weekLabelRef}
					textAnchor="middle"
					fill="currentColor"
					x={xScale(tick)}
					y={yScale.range()[0] + weekLabelHeight + ySpacing}>
					{format(addDays(startOfWeek(new Date()), tick), "E")}
				</text>
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
							key={`lineCircle${i}`}
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
