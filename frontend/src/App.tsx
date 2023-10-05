import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "~/components/navigation/Navbar";
import Topbar from "~/components/navigation/Topbar";
import NotFound from "~/components/shared/NotFound";
import QueryErrorBoundary from "~/components/shared/QueryErrorBoundary";
import SuspenseFallback from "~/components/shared/SuspenseFallback";
import AboutPage from "~/pages/AboutPage";
import AuthPage from "~/pages/AuthPage";
import LeaderboardPage from "~/pages/LeaderboardPage";
import PracticePage from "~/pages/PracticePage";
import ProfilePage from "~/pages/ProfilePage";
import StatsPage from "~/pages/StatsPage";
import { useDarkMode } from "~/store/usePreferencesPersistedStore";

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
						<Topbar />
						<AnimatePresence mode="wait">
							<Routes location={location} key={location.pathname}>
								<Route path="/" index element={<PracticePage />} />
								<Route path="/dashboard" element={<StatsPage />} />
								<Route path="/profile" element={<ProfilePage />} />
								<Route path="*" element={<NotFound />} />
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
