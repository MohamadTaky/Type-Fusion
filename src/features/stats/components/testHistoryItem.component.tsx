import { motion, MotionProps } from "framer-motion";
import { useTranslation } from "react-i18next";

interface IProps extends MotionProps {
	test: string;
	speed: number;
	accuracy: number;
	errors: number;
	wrongEntries: number[];
}

export default function TestHistoryItem({ test, speed, accuracy, errors, wrongEntries, ...props }: IProps) {
	const set = new Set(wrongEntries);
	const { t } = useTranslation();
	return (
		<motion.li
			className="border-b-2 border-gray-400 px-4 py-2 text-sm last:border-none hover:bg-gray-300 rtl:text-end dark:border-hatai-600 dark:hover:bg-hatai-700"
			{...props}>
			<p dir="ltr" className="rtl:text-start">
				{test.split("").map((letter, i) => (
					<span key={`${test}${i}`} dir="ltr" className={set.has(i) ? "text-red-500" : ""}>
						{letter}
					</span>
				))}
			</p>
			<div className=" text-2 mt-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
				<span>
					{t("speed")} : {speed} {t("wpm")}
				</span>
				<span>
					{t("accuracy")} : {accuracy}%
				</span>
				<span>
					{t("errors")} : <span className="text-red-500">{errors}</span>
				</span>
			</div>
		</motion.li>
	);
}
