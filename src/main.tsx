import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import QueryClientProvider from "./libraries/react-query/queryClientProvider";
import "./index.css";
import "libraries/i18next/i18next";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider>
				<Suspense fallback="Loading">
					<App />
				</Suspense>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
