import { Sun, Moon } from "@phosphor-icons/react";
import { useDarkMode, useToggleDarkMode } from "../usePreferencesPersistedStore";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

export default function TopBar() {
	const darkMode = useDarkMode();
	const toggleDarkMode = useToggleDarkMode();

	const MotionMoon = useMemo(() => motion(Moon), []);
	const MotionSun = useMemo(() => motion(Sun), []);

	return (
		<div className="flex justify-end border-b-2 border-gray-300 bg-gray-200 p-2 dark:border-hatai-700 dark:bg-hatai-800">
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
		</div>
	);
}
