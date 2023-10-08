import { motion } from "framer-motion";
import React, { Suspense } from "react";
import SuspenseFallback from "./SuspenseFallback";

export default function AnimatedPage({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <section className={className}>{children}</section>;
	return (
		<Suspense fallback={<SuspenseFallback />}>
			<motion.section
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
