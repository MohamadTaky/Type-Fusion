import { User, ChartBar, Keyboard } from "@phosphor-icons/react";
import coverImage from "/assets/cover-image.webp";
import NavItem from "./navItem.component";

export default function Navbar() {
	return (
		<aside className="bg-fill-3 row-span-2">
			<section className="relative h-64 grid grid-cols-1">
				<div style={{ backgroundImage: `url(${coverImage})` }} className="col-start-1 row-start-1 bg-cover" />
				<div className="max-h-full col-start-1 row-start-1 bg-gradient-to-b from-transparent from-50% to-fill-3" />
				<figure className="col-start-1 row-start-1 place-self-center">
					<User className="bg-fill-2 box-content p-6 rounded-full" weight="fill" size="48" />
					<figcaption className="text-xl text-center">Guest</figcaption>
				</figure>
			</section>
			<nav className="p-4">
				<NavItem to="/" label="practice" Icon={Keyboard} />
				<NavItem to="/stats" label="stats" Icon={ChartBar} />
			</nav>
		</aside>
	);
}
