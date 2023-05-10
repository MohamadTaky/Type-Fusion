import { User, ChartBar, Keyboard, SignIn, SignOut } from "@phosphor-icons/react";
import coverImage from "/assets/cover-image.webp";
import NavItem from "./navItem.component";
import { useTranslation } from "react-i18next";
import useUserAuthQuery from "~/features/auth/hooks/useUserAuthQuery.hook";
import useSignout from "~/features/auth/hooks/useSignout.hook";

export default function Navbar() {
	const { t } = useTranslation();
	const { data: userAuth } = useUserAuthQuery();
	const { mutate: signout } = useSignout();
	return (
		<aside className="row-span-2 border-r border-fill-2 bg-fill-3">
			<section className="relative grid h-64 grid-cols-1">
				<div style={{ backgroundImage: `url(${coverImage})` }} className="col-start-1 row-start-1 bg-cover" />
				<div className="col-start-1 row-start-1 max-h-full bg-gradient-to-b from-transparent from-65% to-fill-3 dark:from-50%" />
				<figure className="col-start-1 row-start-1 place-self-center">
					<User className="box-content rounded-full bg-fill-2 p-6" weight="fill" size="48" />
					<figcaption className="text-center text-xl capitalize text-gray-100">{t("guest")}</figcaption>
				</figure>
			</section>
			<nav>
				<NavItem to="/" label="practice" Icon={Keyboard} />
				<NavItem to="/stats" label="stats" Icon={ChartBar} />
				<div>
					{userAuth ? (
						<button
							onClick={() => signout()}
							className="flex items-center gap-2 text-start
							bg-gray-300 bg-opacity-0 p-2 px-4 capitalize hover:bg-opacity-50
							focus:bg-opacity-50 focus:outline-none dark:bg-hatai-700 dark:bg-opacity-0 dark:hover:bg-opacity-50 dark:focus:bg-opacity-50">
							<SignOut weight="fill" size="25" />
							<span className="whitespace-nowrap min-w-[11ch]">{t("sign out")}</span>
						</button>
					) : (
						<NavItem to="/auth" label="sign in" Icon={SignIn} />
					)}
				</div>
			</nav>
		</aside>
	);
}
