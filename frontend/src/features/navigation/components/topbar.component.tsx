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
		<div className="flex items-center gap-4 border-b border-fill-2 bg-fill-3 p-2">
			<button className="rounded-sm outline-none focus:outline-accent" onClick={toggleDarkMode}>
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
				<button
					className="rounded-sm outline-none focus:outline-accent"
					onClick={() => setIsOpen(prev => !prev)}>
					<Translate size="35" />
				</button>
				<AnimatePresence>
					{isOpen && (
						<motion.ul
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.12 }}
							className="absolute z-50 overflow-hidden rounded-md border border-fill-2 text-center ltr:left-0 rtl:right-0">
							<li
								className="cursor-pointer bg-fill-3 px-4 py-2 hover:bg-fill-2"
								onClick={() => {
									i18n.changeLanguage("en");
									setIsOpen(false);
								}}>
								English
							</li>
							<li
								className="cursor-pointer bg-fill-3 px-4 py-2 hover:bg-fill-2"
								onClick={() => {
									i18n.changeLanguage("ar");
									setIsOpen(false);
								}}>
								العربية
							</li>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
