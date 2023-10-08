import { ReactNode, Suspense } from "react";
import SuspenseFallback from "./SuspenseFallback";

type SuspenseAfterInitialRenderProps = { children: ReactNode; isInitialRender: boolean };

export default function SuspenseAfterInitialRender({
	children,
	isInitialRender,
}: SuspenseAfterInitialRenderProps) {
	return isInitialRender ? <>{children}</> : <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>;
}
