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
							<Warning className="text-red-500" size="96" weight="fill" />
							<p className="mb-2 text-lg text-red-500">{error.message}</p>
							<button
								className="bg-indigo-600 hover:bg-indigo-500 rounded px-3 py-1 transition-colors"
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
