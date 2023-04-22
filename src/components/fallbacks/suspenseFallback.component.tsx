import { CircleNotch } from "@phosphor-icons/react";

export default function SuspenseFallback() {
	return (
		<div className="grid place-items-center place-self-center">
			<CircleNotch size="96" weight="bold" className="animate-spin" />
		</div>
	);
}
