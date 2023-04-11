import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./features/navigation/components/navbar.component";
import StatsPage from "./features/stats/stats.page";
import PracticePage from "./features/practice/practice.page";

function App() {
	const location = useLocation();

	return (
		<div className="dark-mode">
			<div className="text-1 h-screen flex bg-fill-4">
				<Navbar />
				<main className="p-4 flex-1 overflow-hidden">
					<AnimatePresence mode="wait">
						<Routes location={location} key={location.pathname}>
							<Route path="/" index element={<PracticePage />} />
							<Route path="/stats" element={<StatsPage />} />
							<Route path="*" element={<p>404 Not found</p>} />
						</Routes>
					</AnimatePresence>
				</main>
			</div>
		</div>
	);
}

export default App;
