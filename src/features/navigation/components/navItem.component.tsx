import { NavLink, NavLinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "@phosphor-icons/react";

export default function NavItem({ Icon, label, ...props }: IProps) {
	const { t } = useTranslation();
	return (
		<NavLink
			{...props}
			className={({ isActive }) =>
				`flex items-center gap-4 p-2 pr-7 my-2
				transition-colors duration-200 ${isActive ? "text-accent-2 bg-fill-1" : "text-1 hover:bg-fill-2"}`
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
