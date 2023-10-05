import { CircleNotch } from "@phosphor-icons/react";

export default function SuspenseFallback({ className }: { className: string }) {
	return (
		<div className={className}>
			<CircleNotch size="96" weight="bold" className="animate-spin" />
		</div>
	);
}
