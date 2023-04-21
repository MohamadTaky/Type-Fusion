import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./features/navigation/components/navbar.component";
import TopBar from "./features/navigation/components/topbar.component";
import StatsPage from "./features/stats/stats.page";
import PracticePage from "./features/practice/practice.page";
import ErrorPage from "./components/errorPage.component";
import SuspenseAfterInitialRender from "./components/suspenseAfterInitialRender";
import SuspenseFallback from "./components/fallbacks/suspenseFallback.component";
import QueryErrorBoundary from "./components/fallbacks/queryErrorBoundary.component";
import { useDarkMode } from "./features/navigation/usePreferencesPersistedStore";
import { useTranslation } from "react-i18next";

function App() {
	const darkMode = useDarkMode();
	const location = useLocation();
	const { i18n } = useTranslation();

	return (
		<div dir={i18n.language === "ar" ? "rtl" : "ltr"} className={darkMode ? "dark" : ""}>
			<div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden bg-gray-50 dark:bg-hatai-900 dark:text-gray-100">
				<QueryErrorBoundary>
					<Suspense fallback={<SuspenseFallback />}>
						<Navbar />
						<TopBar />
						<SuspenseAfterInitialRender fallback={<SuspenseFallback />}>
							<AnimatePresence mode="wait">
								<Routes location={location} key={location.pathname}>
									<Route path="/" index element={<PracticePage />} />
									<Route path="/stats" element={<StatsPage />} />
									<Route path="*" element={<ErrorPage />} />
								</Routes>
							</AnimatePresence>
						</SuspenseAfterInitialRender>
					</Suspense>
				</QueryErrorBoundary>
			</div>
		</div>
	);
}

export default App;
