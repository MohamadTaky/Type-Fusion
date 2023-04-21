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
			},
			fontFamily: {
				mono: ["Cousine", "Courier New"],
			},
		},
	},
	plugins: [],
};
