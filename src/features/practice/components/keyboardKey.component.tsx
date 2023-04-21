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
				className={`h-8 w-8 rounded-sm text-center text-xs font-bold leading-8 ${className} ${
					key.pressed ? (key.correct ? "bg-green-500" : "bg-red-500") : "bg-gray-300 dark:bg-hatai-700"
				}`}>
				{value}
			</div>
		)
	);
}
