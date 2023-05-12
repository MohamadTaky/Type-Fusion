/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				hatai: {
					900: "#0f0f1f",
					800: "#16162e",
					700: "#1e1e3e",
					600: "#24244c",
				},
				"fill-1": "rgb(var(--color-fill-1) / <alpha-value>)",
				"fill-2": "rgb(var(--color-fill-2) / <alpha-value>)",
				"fill-3": "rgb(var(--color-fill-3) / <alpha-value>)",
				"fill-4": "rgb(var(--color-fill-4) / <alpha-value>)",
				"error-1": "rgb(var(--color-error-1) / <alpha-value>)",
				"error-2": "rgb(var(--color-error-2) / <alpha-value>)",
				"success-1": "rgb(var(--color-success-1) / <alpha-value>)",
				accent: "rgb(var(--color-accent) / <alpha-value>)",
			},
			textColor: {
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				secondary: "rgb(var(--color-secondary) / <alpha-value>)",
			},
			fontFamily: {
				mono: ["Cousine", "Courier New"],
			},
		},
	},
	plugins: [],
};
