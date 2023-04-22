import { Sun, Moon, Translate } from "@phosphor-icons/react";
import { useDarkMode, useToggleDarkMode } from "../usePreferencesPersistedStore";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TopBar() {
	const darkMode = useDarkMode();
	const toggleDarkMode = useToggleDarkMode();
	const { i18n } = useTranslation();

	const MotionMoon = useMemo(() => motion(Moon), []);
	const MotionSun = useMemo(() => motion(Sun), []);

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex items-center gap-4 border-b border-gray-300 bg-gray-200 p-2 dark:border-hatai-600 dark:bg-hatai-800">
			<button onClick={toggleDarkMode}>
				<AnimatePresence mode="wait">
					{darkMode ? (
						<MotionMoon
							className="text-indigo-600"
							size="35"
							weight="fill"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>
					) : (
						<MotionSun
							className="text-orange-600"
							size="35"
							weight="fill"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>
					)}
				</AnimatePresence>
			</button>
			<div className="relative">
				<button onClick={() => setIsOpen(prev => !prev)}>
					<Translate size="35" className="box-content pt-1" />
				</button>
				<AnimatePresence>
					{isOpen && (
						<motion.ul
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.12 }}
							className="absolute z-50 overflow-hidden rounded-md border border-gray-400 text-center ltr:left-0 rtl:right-0 dark:border-hatai-600">
							<li
								onClick={() => {
									i18n.changeLanguage("en");
									setIsOpen(false);
								}}
								className="cursor-pointer bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-hatai-700 dark:hover:bg-hatai-600">
								English
							</li>
							<li
								onClick={() => {
									i18n.changeLanguage("ar");
									setIsOpen(false);
								}}>
								<p className="cursor-pointer bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-hatai-700 dark:hover:bg-hatai-600">
									العربية
								</p>
							</li>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
