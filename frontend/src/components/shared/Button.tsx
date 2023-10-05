interface IProps extends React.ComponentProps<"button"> {}

export default function Button({ children, ...props }: IProps) {
	return (
		<button
			className="w-fit rounded border-2 disabled:cursor-not-allowed border-gray-400 bg-gray-300 px-2 py-1 outline-none first-letter:uppercase focus:border-indigo-600 dark:border-hatai-600 dark:bg-hatai-700 dark:focus:border-indigo-600"
			{...props}>
			{children}
		</button>
	);
}
