import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "src/components/Navbar";
import ErrorPage from "./common/components/errorPage.component";
import SuspenseAfterInitialRender from "./common/components/suspenseAfterInitialRender";
import QueryErrorBoundary from "./common/fallbacks/queryErrorBoundary.component";
import SuspenseFallback from "./common/fallbacks/suspenseFallback.component";
import AboutPage from "./features/about/about.page";
import AuthPage from "./features/auth/auth.page";
import LeaderboardPage from "./features/leaderboard/leaderboard.page";
import TopBar from "./features/navigation/components/topbar.component";
import { useDarkMode } from "./features/navigation/usePreferencesPersistedStore";
import PracticePage from "./features/practice/practice.page";
import ProfilePage from "./features/profile/profile.page";
import StatsPage from "./features/stats/stats.page";

function App() {
	const darkMode = useDarkMode();
	const location = useLocation();
	const { i18n } = useTranslation();

	return (
		<div dir={i18n.language === "ar" ? "rtl" : "ltr"} className={darkMode ? "dark" : ""}>
			<div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden bg-fill-4 text-primary">
				<QueryErrorBoundary>
					<Suspense fallback={<SuspenseFallback className="absolute inset-0 grid place-items-center" />}>
						<Navbar />
						<TopBar />
						<AnimatePresence mode="wait">
							<Routes location={location} key={location.pathname}>
								<Route path="/" index element={<PracticePage />} />
								<Route path="/dashboard" element={<StatsPage />} />
								<Route path="/profile" element={<ProfilePage />} />
								<Route path="*" element={<ErrorPage />} />
								<Route path="/auth" element={<AuthPage />} />
								<Route path="/leaderboard" element={<LeaderboardPage />} />
								<Route path="/about" element={<AboutPage />} />
							</Routes>
						</AnimatePresence>
					</Suspense>
				</QueryErrorBoundary>
			</div>
		</div>
	);
}

export default App;
