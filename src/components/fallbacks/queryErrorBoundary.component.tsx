import React from "react";
import { ArrowClockwise, Warning } from "@phosphor-icons/react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

export default function QueryErrorBoundary({ children }: { children: React.ReactNode }) {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={({ resetErrorBoundary, error }) => (
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<Warning className="text-failure-1" size="96" weight="fill" />
							<p className="text-failure-1 text-lg mb-2">{error.message}</p>
							<button
								className="bg-accent-2 px-3 py-1 rounded transition-colors hover:bg-accent-1"
								onClick={resetErrorBoundary}>
								<ArrowClockwise size="25" weight="bold" />
							</button>
						</div>
					)}>
					{children}
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}
