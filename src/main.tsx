import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "libraries/i18next/i18next";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
