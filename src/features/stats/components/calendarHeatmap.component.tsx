import { timeMonths, scaleThreshold, scaleLinear } from "d3";
import { getDay, differenceInWeeks } from "date-fns";
import { format } from "date-fns-tz";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function CalendarHeatmap({ data, width }: { data: { date: Date }[]; width: number }) {
	const startDate = data[0].date as Date;
	const endDate = data.at(-1)?.date as Date;
	const months = timeMonths(startDate, endDate);
	const { i18n } = useTranslation();

	const [tooltip, setTooltip] = useState({
		x: 0,
		y: 0,
		text: "",
		isActive: false,
	});

	const colorScale = scaleThreshold<number, string>()
		.domain([1, 5, 10, 20])
		.range([
			"dark:fill-hatai-700 fill-gray-300",
			"fill-indigo-600 opacity-40",
			"fill-indigo-600 opacity-60",
			"fill-indigo-600 opacity-80",
			"fill-indigo-600",
		]);
	const textWidth = 18.01;
	const textHeight = 13.33;
	const cellSize = width > 0 ? (width - textWidth) / 53 : 0;
	const isRtl = i18n.language === "ar";

	const xScale = scaleLinear()
		.domain([0, -differenceInWeeks(startDate, endDate) + 1])
		.range(i18n.language === "ar" ? [width - 5, textWidth] : [textWidth + 5, width]);
	const yScale = scaleLinear()
		.domain([0, 6])
		.range([textHeight, textHeight + cellSize * 6]);

	return (
		<figure className="relative text-[10px]">
			<svg
				width={width}
				height={textHeight + 5 + cellSize * 7}
				className="h-fit font-mono"
				fill="currentColor">
				{/* Month labels */}
				{months.map(month => (
					<text
						key={month.toString()}
						y={yScale(0) - 5}
						x={xScale(-differenceInWeeks(startDate, month)) - (isRtl ? textWidth : 0)}>
						{format(month, "MMM", { timeZone: "utc" })}
					</text>
				))}

				{/* Week labels */}
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((el, i) => (
					<text
						key={el}
						x={isRtl ? width : 0}
						y={textHeight + yScale(i) - cellSize / 4}
						alignmentBaseline="middle">
						{el}
					</text>
				))}
				{/* Heatmap */}
				{data.map((el: any) => {
					return (
						<rect
							key={el.date.toString()}
							width={cellSize * 0.9}
							height={cellSize * 0.9}
							x={xScale(-differenceInWeeks(startDate, el.date)) - (isRtl ? cellSize + textWidth : 0)}
							y={yScale(getDay(el.date))}
							rx={2}
							className={`stroke-transparent ${colorScale(el.value)}`}
							onMouseLeave={() => setTooltip(prev => ({ ...prev, isActive: false }))}
							onMouseEnter={() =>
								setTooltip({
									text: format(el.date, "yyyy/M/d"),
									x: xScale(-differenceInWeeks(startDate, el.date)) - (isRtl ? cellSize + textWidth : 0),
									y: getDay(el.date) * cellSize - 7,
									isActive: true,
								})
							}
						/>
					);
				})}
			</svg>
			<AnimatePresence>
				{tooltip.isActive && (
					<Tooltip x={tooltip.x + (cellSize * 0.85) / 2} y={tooltip.y + 21 - cellSize - 7}>
						{tooltip.text}
					</Tooltip>
				)}
			</AnimatePresence>
		</figure>
	);
}

function Tooltip({ x, y, children }: { x: number; y: number; children: string }) {
	const position = {
		left: x,
		top: y,
		translateX: -40,
	};
	return (
		<motion.figcaption
			className="pointer-events-none absolute w-20 rounded-md bg-indigo-400 p-1 text-center text-xs dark:bg-indigo-600"
			transition={{ type: "tween", duration: 0.1, ease: "linear", opacity: { duration: 0.2 } }}
			initial={{ ...position, opacity: 0 }}
			animate={{ ...position, opacity: 1 }}
			exit={{ opacity: 0 }}>
			{children}
		</motion.figcaption>
	);
}
