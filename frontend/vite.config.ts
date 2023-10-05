import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	return {
		plugins: [react(), tsconfigPaths(), svgr()],
		server: {
			port: 3000,
			proxy: {
				"/api": command === "serve" ? "http://localhost:8000" : "",
			},
		},
		resolve: {
			alias: {
				"~": "./src",
			},
		},
	};
});
