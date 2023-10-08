import App from "@/App";
import "@/index.css";
import "@/libraries/i18next/i18next";
import QueryClientProvider from "@/libraries/react-query/queryClientProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
