import { NavLink, NavLinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "@phosphor-icons/react";

export default function NavItem({ Icon, label, ...props }: IProps) {
	const { t } = useTranslation();
	return (
		<NavLink
			{...props}
			className={({ isActive }) =>
				`flex items-center gap-2 bg-gray-300 p-2 px-4 capitalize focus:outline-none dark:bg-hatai-700 ${
					isActive
						? "text-indigo-600"
						: "bg-opacity-0 hover:bg-opacity-50 focus:bg-opacity-50 dark:bg-opacity-0 dark:hover:bg-opacity-50 dark:focus:bg-opacity-50"
				}`
			}>
			<Icon weight="fill" size="25" />
			<span className="min-w-[11ch] whitespace-nowrap">{t(label)}</span>
		</NavLink>
	);
}

interface IProps extends NavLinkProps {
	Icon: Icon;
	label: string;
}
