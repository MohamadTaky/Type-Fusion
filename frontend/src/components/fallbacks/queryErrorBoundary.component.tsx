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
							<Warning className="text-error-2" size="96" weight="fill" />
							<p className="mb-2 text-lg text-error-2">{error.message}</p>
							<button
								className="rounded bg-indigo-600 px-3 py-1 transition-colors hover:bg-indigo-500"
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
