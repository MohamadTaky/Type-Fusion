import { motion } from "framer-motion";
import React from "react";

export default function AnimatedPage({ children }: { children: React.ReactNode }) {
	return (
		<motion.section
			initial={{ opacity: 0, translateY: "50%" }}
			animate={{ opacity: 1, translateY: "0%" }}
			exit={{ opacity: 0, translateY: "50%" }}
			transition={{ type: "tween" }}>
			{children}
		</motion.section>
	);
}
