/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			"fill-1": "rgb(var(--color-fill-1) / <alpha-value>)",
			"fill-2": "rgb(var(--color-fill-2) / <alpha-value>)",
			"fill-3": "rgb(var(--color-fill-3) / <alpha-value>)",
			"fill-4": "rgb(var(--color-fill-4) / <alpha-value>)",
			"accent-1": "rgb(var(--color-accent-1) / <alpha-value>)",
			"accent-2": "rgb(var(--color-accent-2) / <alpha-value>)",
			"failure-1": "rgb(var(--color-failure-1) / <alpha-value>)",
			"success-1": "rgb(var(--color-success-1) / <alpha-value>)",
			transparent: "#00000000",
		},
		gradientColorStops: {
			"fill-1": "rgb(var(--color-fill-1))",
			"fill-2": "rgb(var(--color-fill-2))",
			"fill-3": "rgb(var(--color-fill-3))",
			"fill-4": "rgb(var(--color-fill-4))",
			"accent-1": "rgb(var(--color-accent-1))",
			"accent-2": "rgb(var(--color-accent-2))",
			transparent: "#00000000",
			"success-1": "rgb(var(--color-success-1))",
		},
		extend: {
			textColor: {
				1: "rgb(var(--color-text-1) / <alpha-value>)",
				2: "rgb(var(--color-text-2) / <alpha-value>)",
			},
			fontFamily: {
				mono: ["Cousine", "Courier New"],
			},
		},
	},
	plugins: [],
};
