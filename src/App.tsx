import Navbar from "./features/navigation/components/navbar.component";
import { Routes, Route } from "react-router-dom";
import StatsPage from "./features/stats/stats.page";
import PracticePage from "./features/practice/practice.page";

function App() {
	return (
		<div className="dark-mode">
			<div className="text-1 w-screen h-screen flex bg-fill-4">
				<Navbar />
				<Routes>
					<Route path="practice" element={<PracticePage />} />
					<Route path="stats" element={<StatsPage />} />
					<Route path="*" element={<p>404 Not found</p>} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
