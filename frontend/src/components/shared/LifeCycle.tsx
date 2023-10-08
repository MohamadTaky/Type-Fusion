import { useEffect } from "react";

export default function LifeCycle({ afterRender }: { afterRender: () => void }) {
	useEffect(afterRender, []);
	return null;
}
