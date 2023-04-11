import React, { useRef, useEffect } from "react";
import usePracticeStore from "../practice.store";

interface IProps {
	value: React.ReactNode;
	className?: string;
	keyCode: string;
}

export default function KeyboardKey({ value, keyCode, className }: IProps) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		ref.current?.classList.add("bg-fill-2");
		usePracticeStore.subscribe(async state => {
			if (state.pressedKeys.has(keyCode)) {
				ref.current?.classList.add("bg-fill-1");
				ref.current?.classList.remove("bg-fill-2");
			} else {
				ref.current?.classList.add("bg-fill-2");
				ref.current?.classList.remove("bg-fill-1");
			}
		});
	}, []);
	return (
		<div
			ref={ref}
			className={`w-8 h-8 leading-8 text-center text-xs font-bold rounded-sm transition-colors duration-100 ${className}`}>
			{value}
		</div>
	);
}
