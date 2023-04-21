import { NavLink, NavLinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "@phosphor-icons/react";

export default function NavItem({ Icon, label, ...props }: IProps) {
	const { t } = useTranslation();
	return (
		<NavLink
			{...props}
			className={({ isActive }) =>
				`flex items-center gap-4 bg-gray-300 p-2 px-4 pr-11 dark:bg-hatai-700 ${
					isActive
						? "text-indigo-600"
						: "bg-opacity-0 hover:bg-opacity-50 dark:bg-opacity-0 dark:hover:bg-opacity-50"
				}`
			}>
			<Icon weight="fill" size="25" />
			<span>{t(label)}</span>
		</NavLink>
	);
}

interface IProps extends NavLinkProps {
	Icon: Icon;
	label: string;
}
