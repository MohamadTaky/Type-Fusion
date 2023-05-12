import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./features/navigation/components/navbar.component";
import TopBar from "./features/navigation/components/topbar.component";
import StatsPage from "./features/stats/stats.page";
import PracticePage from "./features/practice/practice.page";
import ErrorPage from "./components/errorPage.component";
import AuthPage from "./features/auth/auth.page";
import LeaderboardPage from "./features/leaderboard/leaderboard.page";
import SuspenseFallback from "./components/fallbacks/suspenseFallback.component";
import SuspenseAfterInitialRender from "./components/suspenseAfterInitialRender";
import QueryErrorBoundary from "./components/fallbacks/queryErrorBoundary.component";
import { useDarkMode } from "./features/navigation/usePreferencesPersistedStore";
import { useTranslation } from "react-i18next";
import ProfilePage from "./features/profile/profile.page";

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
						<SuspenseAfterInitialRender
							fallback={<SuspenseFallback className="grid place-items-center place-self-center" />}>
							<AnimatePresence mode="wait">
								<Routes location={location} key={location.pathname}>
									<Route path="/" index element={<PracticePage />} />
									<Route path="/dashboard" element={<StatsPage />} />
									<Route path="/profile" element={<ProfilePage />} />
									<Route path="*" element={<ErrorPage />} />
									<Route path="/auth" element={<AuthPage />} />
									<Route path="/leaderboard" element={<LeaderboardPage />} />
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
