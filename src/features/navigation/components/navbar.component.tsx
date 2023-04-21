import { User, ChartBar, Keyboard } from "@phosphor-icons/react";
import coverImage from "/assets/cover-image.webp";
import NavItem from "./navItem.component";

export default function Navbar() {
	return (
		<aside className="row-span-2 bg-gray-200 dark:bg-hatai-800 border-r-2 dark:border-hatai-700 border-gray-300">
			<section className="relative grid h-64 grid-cols-1">
				<div style={{ backgroundImage: `url(${coverImage})` }} className="col-start-1 row-start-1 bg-cover" />
				<div className="col-start-1 row-start-1 max-h-full bg-gradient-to-b from-transparent from-50% to-gray-200 dark:to-hatai-800" />
				<figure className="col-start-1 row-start-1 place-self-center">
					<User
						className="box-content rounded-full bg-gray-200 p-6 dark:bg-hatai-700"
						weight="fill"
						size="48"
					/>
					<figcaption className="text-center text-xl text-gray-100">Guest</figcaption>
				</figure>
			</section>
			<nav>
				<NavItem to="/" label="practice" Icon={Keyboard} />
				<NavItem to="/stats" label="stats" Icon={ChartBar} />
			</nav>
		</aside>
	);
}
