import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Topbar from "@/components/navigation/Topbar";
import NotFound from "@/components/shared/NotFound";
import QueryErrorBoundary from "@/components/shared/QueryErrorBoundary";
import SuspenseFallback from "@/components/shared/SuspenseFallback";
import AboutPage from "@/pages/AboutPage";
import AuthPage from "@/pages/AuthPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import PracticePage from "@/pages/PracticePage";
import ProfilePage from "@/pages/ProfilePage";
import StatsPage from "@/pages/StatsPage";
import usePreferencesPersistedStore from "@/store/usePreferencesPersistedStore";
import LifeCycle from "./components/shared/LifeCycle";
import SuspenseAfterInitialRender from "./components/shared/SuspenseAfterInitialRender";
import cn from "./utils/cn";

function App() {
  const darkMode = usePreferencesPersistedStore((store) => store.darkMode);
  const location = useLocation();
  const { i18n } = useTranslation();
  const [isInitialRender, setIsInitialRender] = useState(true);

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className={cn(
        "grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden bg-fill-4 text-primary",
        darkMode ? "dark" : ""
      )}
    >
      <QueryErrorBoundary>
        <Suspense fallback={<SuspenseFallback />}>
          <LifeCycle afterRender={() => setIsInitialRender(false)} />
          <Navbar />
          <Topbar />
          <AnimatePresence mode="wait">
            <motion.main
              initial={{ opacity: 0, translateY: "50%" }}
              animate={{ opacity: 1, translateY: "0%" }}
              exit={{ opacity: 0, translateY: "50%" }}
              transition={{ type: "tween" }}
              className="scrollbar-rounded relative overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-indigo-600"
              key={location.pathname}
            >
              <SuspenseAfterInitialRender isInitialRender={isInitialRender}>
                <Routes location={location}>
                  <Route path="/" index element={<PracticePage />} />
                  <Route path="/dashboard" element={<StatsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </SuspenseAfterInitialRender>
            </motion.main>
          </AnimatePresence>
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
}

export default App;
