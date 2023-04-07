import { User, ChartBar, Keyboard } from "@phosphor-icons/react";
import coverImage from "/assets/cover-image.webp";
import NavItem from "./navItem.component";

export default function Navbar() {
	return (
		<aside className="w-2/12 bg-fill-3">
			<figure className="relative isolate h-64 flex flex-col justify-center items-center gap-4">
				<img
					className="absolute inset-0 w-full h-full object-cover -z-20"
					src={coverImage}
					alt="cover-image"
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-fill-3" />
				<div className="w-28 h-28 bg-fill-2 rounded-full grid place-items-center">
					<User weight="fill" size="48" />
				</div>
				<div className="text-xl">Guest</div>
			</figure>
			<nav className="flex flex-col justify-center m-4 gap-4 text-center text-lg">
				<NavItem to="/" label="practice" Icon={Keyboard} />
				<NavItem to="/stats" label="stats" Icon={ChartBar} />
			</nav>
		</aside>
	);
}
