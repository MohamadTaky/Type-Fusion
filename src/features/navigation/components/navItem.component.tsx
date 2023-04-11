import { NavLink, NavLinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "@phosphor-icons/react";

export default function NavItem({ Icon, label, ...props }: IProps) {
	const { t } = useTranslation();
	return (
		<NavLink
			{...props}
			className={({ isActive }) =>
				`flex items-center justify-between py-1.5 px-3 rounded-lg transition-colors duration-200 ${
					isActive ? "text-accent-2 bg-fill-1" : "text-1 bg-fill-2 hover:bg-fill-1"
				}`
			}>
			{t(label)}
			<Icon weight="fill" size="25" />
		</NavLink>
	);
}

interface IProps extends NavLinkProps {
	Icon: Icon;
	label: string;
}
