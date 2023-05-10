import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default ({ mode }) => {
	return defineConfig({
		plugins: [react(), tsconfigPaths()],
		server: {
			port: 3000,
			proxy: {
				"/api": process.env.VITE_VERCEL_ENV === "production" ? process.env.API : "http://localhost:8000",
			},
		},
	});
};
