import { motion } from "framer-motion";
import React from "react";

export default function AnimatedPage({ children }: { children: React.ReactNode }) {
	return (
		<motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			{children}
		</motion.section>
	);
}
