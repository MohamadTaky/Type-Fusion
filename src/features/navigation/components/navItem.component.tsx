import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "@phosphor-icons/react";

export default function NavItem({ Icon, label }: IProps) {
	const { t } = useTranslation();
	return (
		<NavLink
			to={`/${label}`}
			className={({ isActive }) =>
				`flex items-center justify-between bg-fill-2 py-1.5 px-3 rounded-lg transition-colors duration-200 hover:bg-fill-1
				${isActive ? "text-accent-2 bg-fill-1" : "text-1"}`
			}>
			{t(label)}
			<Icon weight="fill" size="25" />
		</NavLink>
	);
}

interface IProps {
	Icon: Icon;
	label: string;
}
