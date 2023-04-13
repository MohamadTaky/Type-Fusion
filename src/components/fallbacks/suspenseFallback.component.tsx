import { CircleNotch } from "@phosphor-icons/react";

export default function SuspenseFallback() {
	return (
		<div className="absolute inset-0 grid place-items-center">
			<CircleNotch size="96" weight="bold" className="text-1 animate-spin" />
		</div>
	);
}
