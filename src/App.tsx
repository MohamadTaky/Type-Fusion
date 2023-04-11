import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./features/navigation/components/navbar.component";
import StatsPage from "./features/stats/stats.page";
import PracticePage from "./features/practice/practice.page";
import { CircleNotch, ArrowClockwise, Warning } from "@phosphor-icons/react";
import SuspenseAfterInitialRender from "./components/suspenseAfterInitialRender";

function App() {
	const location = useLocation();

	return (
		<div className="dark-mode">
			<div className="text-1 h-screen flex bg-fill-4">
				<QueryErrorResetBoundary>
					{({ reset }) => (
						<ErrorBoundary
							onReset={reset}
							fallbackRender={({ resetErrorBoundary, error }) => (
								<div className="absolute inset-0 flex flex-col items-center justify-center">
									<Warning size="96" weight="fill" className="text-failure-1"/>
									<p className="text-failure-1 text-lg mb-2">{error.message}</p>
									<button
										className="bg-accent-2 px-3 py-1 rounded transition-colors hover:bg-accent-1"
										onClick={resetErrorBoundary}>
										<ArrowClockwise size="25" weight="fill" />
									</button>
								</div>
							)}>
							<Suspense
								fallback={
									<div className="absolute inset-0 grid place-items-center">
										<CircleNotch size="96" weight="bold" className="text-1 animate-spin" />
									</div>
								}>
								<Navbar />
								<main className="p-4 flex-1 overflow-hidden relative">
									<SuspenseAfterInitialRender
										fallback={
											<div className="absolute inset-0 grid place-items-center">
												<CircleNotch size="96" weight="bold" className="text-1 animate-spin" />
											</div>
										}>
										<AnimatePresence mode="wait">
											<Routes location={location} key={location.pathname}>
												<Route path="/" index element={<PracticePage />} />
												<Route path="/stats" element={<StatsPage />} />
												<Route path="*" element={<p>404 Not found</p>} />
											</Routes>
										</AnimatePresence>
									</SuspenseAfterInitialRender>
								</main>
							</Suspense>
						</ErrorBoundary>
					)}
				</QueryErrorResetBoundary>
			</div>
		</div>
	);
}

export default App;
