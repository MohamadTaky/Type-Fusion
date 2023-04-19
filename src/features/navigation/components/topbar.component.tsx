import { Sun, Moon } from "@phosphor-icons/react";
import { useDarkMode, useToggleDarkMode } from "../usePreferencesPersistedStore";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

export default function TopBar() {
	const darkMode = useDarkMode();
	const toggleDarkMode = useToggleDarkMode();

	const Icon = motion(darkMode ? Moon : Sun);

	return (
		<div className="bg-fill-3 p-2 flex justify-end">
			<button onClick={toggleDarkMode}>
				<MotionConfig transition={{ duration: 0.15 }}>
					<AnimatePresence mode="wait">
						<Icon
							key={+darkMode}
							size="35"
							weight="fill"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, color: darkMode ? "blueviolet" : "orange" }}
							exit={{ opacity: 0 }}
						/>
					</AnimatePresence>
				</MotionConfig>
			</button>
		</div>
	);
}
