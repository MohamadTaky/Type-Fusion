import { useEffect } from "react";

export default function useWindowEvent<T extends keyof WindowEventMap>(
	type: T,
	listener: (event: WindowEventMap[T]) => any
) {
	useEffect(() => {
		window.addEventListener(type, listener);
		return () => window.removeEventListener(type, listener);
	}, []);
}
