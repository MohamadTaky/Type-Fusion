import React, { useEffect } from "react";
import { useAddKey, useKey } from "../usePractice.store";

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
		key && (
			<div
				className={`w-8 h-8 leading-8 text-center text-xs font-bold rounded-sm transition-colors duration-100 ${className} ${
					key.pressed ? (key.correct ? "bg-success-1" : "bg-failure-1") : "bg-fill-2"
				}`}>
				{value}
			</div>
		)
	);
}
