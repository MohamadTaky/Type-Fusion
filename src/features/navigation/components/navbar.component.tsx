import { User, ChartBar, Keyboard } from "@phosphor-icons/react";
import coverImage from "/assets/cover-image.webp";
import NavItem from "./navItem.component";
import { useTranslation } from "react-i18next";

export default function Navbar() {
	const { t } = useTranslation();
	return (
		<aside className="row-span-2 border-r border-gray-300 bg-gray-200 dark:border-hatai-600 dark:bg-hatai-800">
			<section className="relative grid h-64 grid-cols-1">
				<div style={{ backgroundImage: `url(${coverImage})` }} className="col-start-1 row-start-1 bg-cover" />
				<div className="col-start-1 row-start-1 max-h-full bg-gradient-to-b from-transparent from-50% to-gray-200 dark:to-hatai-800" />
				<figure className="col-start-1 row-start-1 place-self-center">
					<User
						className="box-content rounded-full bg-gray-200 p-6 dark:bg-hatai-700"
						weight="fill"
						size="48"
					/>
					<figcaption className="text-center text-xl text-gray-100 capitalize">{t("guest")}</figcaption>
				</figure>
			</section>
			<nav>
				<NavItem to="/" label="practice" Icon={Keyboard} />
				<NavItem to="/stats" label="stats" Icon={ChartBar} />
			</nav>
		</aside>
	);
}
