/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			"fill-1": withOpacity("--color-fill-1"),
			"fill-2": withOpacity("--color-fill-2"),
			"fill-3": withOpacity("--color-fill-3"),
			"fill-4": withOpacity("--color-fill-4"),
			"accent-1": withOpacity("--color-accent-1"),
			"accent-2": withOpacity("--color-accent-2"),
			transparent: "#00000000",
			success: withOpacity("--color-success-1"),
		},
		gradientColorStops: {
			"fill-1": "rgb(var(--color-fill-1))",
			"fill-2": "rgb(var(--color-fill-2))",
			"fill-3": "rgb(var(--color-fill-3))",
			"fill-4": "rgb(var(--color-fill-4))",
			"accent-1": "rgb(var(--color-accent-1))",
			"accent-2": "rgb(var(--color-accent-2))",
			transparent: "#00000000",
			success: "rgb(var(--color-success-1))",
		},
		extend: {
			textColor: {
				1: withOpacity("--color-text-1"),
			},
		},
	},
	plugins: [],
};

function withOpacity(variable) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) return `rgba(var(${variable}), ${opacityValue})`;
		return `rgb(${variable})`;
	};
}
