import { CircleNotch } from "@phosphor-icons/react";

export default function SuspenseFallback() {
	return (
		<div className="absolute inset-0 grid place-items-center">
			<CircleNotch size="96" weight="bold" className="animate-spin dark:text-gray-100" />
		</div>
	);
}
