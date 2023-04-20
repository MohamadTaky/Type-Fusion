import { motion, MotionProps } from "framer-motion";

interface IProps extends MotionProps {
	test: string;
	speed: number;
	accuracy: number;
	errors: number;
	wrongEntries: number[];
}

export default function TestHistoryItem({ test, speed, accuracy, errors, wrongEntries, ...props }: IProps) {
	const set = new Set(wrongEntries);
	return (
		<motion.li
			className="px-4 py-2 hover:bg-fill-2 transition-colors  text-sm border-fill-1 border-b-2 last:border-none"
			{...props}>
			{test.split("").map((letter, i) => (
				<span className={set.has(i) ? "text-failure-1" : ""}>{letter}</span>
			))}
			<div className=" mt-2 flex justify-between text-2 text-xs">
				<span>speed : {speed}wpm</span>
				<span>accuracy : {accuracy}%</span>
				<span>
					errors : <span className="text-failure-1">{errors}</span>
				</span>
			</div>
		</motion.li>
	);
}
