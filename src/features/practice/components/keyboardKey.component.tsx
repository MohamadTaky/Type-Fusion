import React, { useEffect } from "react";
import { useAddKey, useKey } from "../practice.store";
import { motion } from "framer-motion";

interface IProps {
	value: React.ReactNode;
	className?: string;
	keyCode: string;
}

export default function KeyboardKey({ value, keyCode, className }: IProps) {
	const addKeycode = useAddKey();
	const key = useKey(keyCode);

	useEffect(() => {
		addKeycode(keyCode);
	}, []);
	return (
		<motion.div
			className={`w-8 h-8 leading-8 text-center text-xs font-bold rounded-sm transition-colors duration-100 ${className} ${
				key ? "bg-fill-1" : "bg-fill-2"
			}`}>
			{value}
		</motion.div>
	);
}
