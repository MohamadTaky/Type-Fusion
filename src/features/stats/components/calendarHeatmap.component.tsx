import { timeMonths, scaleThreshold } from "d3";
import { getDay, differenceInWeeks } from "date-fns";
import { format } from "date-fns-tz";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CalendarHeatmap({ data, width }: { data: { date: Date }[]; width: number }) {
	const startDate = data[0].date as Date;
	const endDate = data.at(-1)?.date as Date;
	const months = timeMonths(startDate, endDate);

	const [tooltip, setTooltip] = useState({
		x: 0,
		y: 0,
		text: "",
		isActive: false,
	});
	const margins = 5;

	const innerWidth = width - margins * 2;

	const cellSize = innerWidth > 0 ? (innerWidth - 18) / 53 : 0;

	const colorScale = scaleThreshold<number, string>()
		.domain([1, 5, 10, 20])
		.range([
			"fill-fill-2",
			"fill-accent-2 opacity-40",
			"fill-accent-2 opacity-60",
			"fill-accent-2 opacity-80",
			"fill-accent-2",
		]);

	return (
		<figure className="text-[10px] relative">
			<svg width={width} height={cellSize * 8 + margins * 2} className="font-mono h-fit" fill="currentColor">
				{/* Month labels */}
				{months.map(month => (
					<text
						key={month.toString()}
						y={margins + 13.33 - 5}
						x={margins + 18 + -differenceInWeeks(startDate, month) * cellSize}>
						{format(month, "MMM", { timeZone: "utc" })}
					</text>
				))}

				{/* Week labels */}
				<g transform={`translate(${margins},${margins + 13.33})`}>
					{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((el, i) => (
						<text key={el} alignmentBaseline="middle" x="-5" y={i * cellSize + cellSize / 2}>
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
								x={18 + -differenceInWeeks(startDate, el.date) * cellSize}
								y={getDay(el.date) * cellSize}
								strokeWidth={5}
								rx={2}
								className={`stroke-transparent ${colorScale(el.value)}`}
								onMouseLeave={() => setTooltip(prev => ({ ...prev, isActive: false }))}
								onMouseEnter={() =>
									setTooltip({
										text: format(el.date, "yyyy/M/d"),
										x: 23 + -differenceInWeeks(startDate, el.date) * cellSize,
										y: getDay(el.date) * cellSize,
										isActive: true,
									})
								}
							/>
						);
					})}
				</g>
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
			className="absolute pointer-events-none bg-accent-1 p-1 text-center rounded-md w-20"
			transition={{ type: "tween", duration: 0.1, ease: "linear", opacity: { duration: 0.2 } }}
			initial={{ ...position, opacity: 0 }}
			animate={{ ...position, opacity: 1 }}
			exit={{ opacity: 0 }}>
			{children}
		</motion.figcaption>
	);
}
