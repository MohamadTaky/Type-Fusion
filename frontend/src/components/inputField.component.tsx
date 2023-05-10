import { useState } from "react";
import { useTranslation } from "react-i18next";

interface IProps extends React.ComponentProps<"input"> {
	id: string;
	label: string;
}

export default function InputField({ id, label, ...props }: IProps) {
	const [value, setValue] = useState("");
	const { t } = useTranslation();
	return (
		<div className="group relative min-w-[30ch] rounded border-2 border-gray-400 bg-gray-300 focus-within:border-indigo-600 dark:border-hatai-600 dark:bg-hatai-700 dark:focus-within:border-indigo-600">
			<label
				className={`transition-[font-size font-weight transform] pointer-events-none absolute inset-1 w-fit capitalize text-secondary duration-300 group-focus-within:-translate-y-[15px] group-focus-within:text-xs group-focus-within:font-semibold group-focus-within:text-indigo-600
				${value ? "-translate-y-[15px] text-xs font-semibold" : ""}`}
				htmlFor={id}>
				{t(label)}
				<span className="absolute -inset-x-0.5 bottom-2 -z-10 h-2 rounded bg-gray-300 dark:bg-hatai-700" />
			</label>
			<input
				dir="auto"
				value={value}
				onChange={e => setValue(e.target.value)}
				className="w-full bg-transparent px-2 py-1 outline-none disabled:cursor-not-allowed disabled:text-secondary"
				id={id}
				{...props}
			/>
		</div>
	);
}
