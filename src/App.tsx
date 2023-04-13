import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./features/navigation/components/navbar.component";
import StatsPage from "./features/stats/stats.page";
import PracticePage from "./features/practice/practice.page";
import ErrorPage from "./components/errorPage.component";
import SuspenseAfterInitialRender from "./components/suspenseAfterInitialRender";
import SuspenseFallback from "./components/fallbacks/suspenseFallback.component";
import QueryErrorBoundary from "./components/fallbacks/queryErrorBoundary.component";

function App() {
	const location = useLocation();
	return (
		<div className="dark-mode">
			<div className="text-1 h-screen flex bg-fill-4">
				<QueryErrorBoundary>
					<Suspense fallback={<SuspenseFallback />}>
						<Navbar />
						<main className="p-4 flex-1 overflow-hidden relative">
							<SuspenseAfterInitialRender fallback={<SuspenseFallback />}>
								<AnimatePresence mode="wait">
									<Routes location={location} key={location.pathname}>
										<Route path="/" index element={<PracticePage />} />
										<Route path="/stats" element={<StatsPage />} />
										<Route path="*" element={<ErrorPage />} />
									</Routes>
								</AnimatePresence>
							</SuspenseAfterInitialRender>
						</main>
					</Suspense>
				</QueryErrorBoundary>
			</div>
		</div>
	);
}

export default App;
