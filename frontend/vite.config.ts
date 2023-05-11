import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	return {
		plugins: [react(), tsconfigPaths()],
		server: {
			port: 3000,
			proxy: {
				"/api": command === "serve" ? "http://localhost:8000" : "",
			},
		},
	};
});
