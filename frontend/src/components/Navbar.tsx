import { User, ChartBar, Keyboard, SignIn, SignOut, Crown, UserCircle, Info } from "@phosphor-icons/react";
import coverImage from "/assets/cover-image.webp";
import NavItem from "../features/navigation/components/navItem.component";
import { useTranslation } from "react-i18next";
import useUserAuthQuery from "src/features/auth/hooks/useUserAuthQuery.hook";
import useSignout from "src/features/auth/hooks/useSignout.hook";

export default function Navbar() {
	const { t } = useTranslation();
	const { data: userAuth } = useUserAuthQuery();
	const { mutate: signout } = useSignout();
	return (
		<aside className="row-span-2 border-fill-2 bg-fill-3 ltr:border-r rtl:border-l">
			<section className="relative grid h-64 grid-cols-1">
				<div style={{ backgroundImage: `url(${coverImage})` }} className="col-start-1 row-start-1 bg-cover" />
				<div className="col-start-1 row-start-1 max-h-full bg-gradient-to-b from-transparent from-65% to-fill-3 dark:from-50%" />
				<figure className="col-start-1 row-start-1 place-self-center">
					<User className="mx-auto box-content rounded-full bg-fill-2 p-6" weight="fill" size="48" />
					<figcaption className="text-center text-lg text-gray-100">
						{userAuth ? userAuth.username : t("guest")}
					</figcaption>
				</figure>
			</section>
			<nav>
				<NavItem to="/" label="practice" Icon={Keyboard} />
				<NavItem to="/dashboard" label="dashboard" Icon={ChartBar} />
				<NavItem to="/leaderboard" label="leaderboard" Icon={Crown} />
				<div>
					{userAuth ? (
						<>
							<NavItem to="/profile" label="profile" Icon={UserCircle} />
							<button
								onClick={() => signout()}
								className="flex items-center gap-2 bg-gray-300
							bg-opacity-0 p-2 px-4 text-start capitalize hover:bg-opacity-50
							focus:bg-opacity-50 focus:outline-none dark:bg-hatai-700 dark:bg-opacity-0 dark:hover:bg-opacity-50 dark:focus:bg-opacity-50">
								<SignOut weight="fill" size="25" />
								<span className="min-w-[11ch] whitespace-nowrap">{t("sign out")}</span>
							</button>
						</>
					) : (
						<NavItem to="/auth" label="sign in" Icon={SignIn} />
					)}
					<NavItem to="/about" label="about" Icon={Info} />
				</div>
			</nav>
		</aside>
	);
}
