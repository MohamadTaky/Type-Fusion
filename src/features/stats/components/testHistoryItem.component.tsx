import { motion, MotionProps } from "framer-motion";

interface IProps extends MotionProps {
	test: string;
	speed: number;
	accuracy: number;
	errors: number;
}

export default function TestHistoryItem({ test, speed, accuracy, errors, ...props }: IProps) {
	return (
		<motion.li
			className="px-4 py-2 hover:bg-fill-2 transition-colors  text-sm border-fill-1 border-b-2 last:border-none"
			{...props}>
			{test}
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
