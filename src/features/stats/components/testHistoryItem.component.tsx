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
			className="border-b-2 border-gray-400 px-4 py-2 text-sm last:border-none hover:bg-gray-300 dark:border-hatai-600 dark:hover:bg-hatai-700"
			{...props}>
			{test.split("").map((letter, i) => (
				<span className={set.has(i) ? "text-red-500" : ""}>{letter}</span>
			))}
			<div className=" text-2 mt-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
				<span>speed : {speed}wpm</span>
				<span>accuracy : {accuracy}%</span>
				<span>
					errors : <span className="text-red-500">{errors}</span>
				</span>
			</div>
		</motion.li>
	);
}
