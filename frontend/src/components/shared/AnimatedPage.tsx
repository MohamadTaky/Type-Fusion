import { motion } from "framer-motion";
import React, { Suspense, useRef } from "react";
import SuspenseFallback from "./SuspenseFallback";

export default function AnimatedPage({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const sectionRef = useRef(null);

	return (
		<Suspense fallback={<SuspenseFallback className="grid place-items-center place-self-center" />}>
			<motion.section
				ref={sectionRef}
				initial={{ opacity: 0, translateY: "50%" }}
				animate={{ opacity: 1, translateY: "0%" }}
				exit={{ opacity: 0, translateY: "50%" }}
				transition={{ type: "tween" }}
				className={className}>
				{children}
			</motion.section>
		</Suspense>
	);
}
