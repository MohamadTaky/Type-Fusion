import AnimatedPage from "src/common/components/animatedPage.component";
import { ReactComponent as MongodbLogo } from "./assets/mongodb-logo.svg";
import { ReactComponent as ExpressLogo } from "./assets/express-logo.svg";
import { ReactComponent as ReactLogo } from "./assets/react-logo.svg";
import { ReactComponent as NodejsLogo } from "./assets/nodejs-logo.svg";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
	const { t } = useTranslation();
	return (
		<AnimatedPage className="m-4 mx-auto flex w-fit flex-col items-center justify-between gap-4 bg-fill-3 p-4">
			<header className="max-w-[55ch] text-center leading-6">{t("about info")}</header>
			<section className="w-full text-center">
				<p className="mb-4 text-xl font-bold capitalize">{t("made with")}</p>
				<ul className="flex w-full justify-between gap-4">
					<li>
						<a href="https://www.mongodb.com/" className="group" target="_blank">
							<MongodbLogo className="mx-auto h-16 w-16 fill-secondary group-hover:fill-[#4DB33D] group-hover:transition-colors" />
							<p className="text-secondary group-hover:text-[#4DB33D] group-hover:transition-colors">
								MongoDB
							</p>
						</a>
					</li>
					<li>
						<a href="https://expressjs.com/" className="group" target="_blank">
							<ExpressLogo className="h-16 w-16 fill-secondary group-hover:fill-black group-hover:transition-colors" />
							<p className="text-secondary group-hover:text-black group-hover:transition-colors">
								Express.js
							</p>
						</a>
					</li>
					<li>
						<a href="https://reactjs.org/" className="group" target="_blank">
							<ReactLogo className="h-16 w-16 fill-secondary group-hover:fill-[#61DBFB] group-hover:transition-colors" />
							<p className="text-secondary group-hover:text-[#61DBFB] group-hover:transition-colors">React</p>
						</a>
					</li>
					<li>
						<a href="https://nodejs.org/" className="group" target="_blank">
							<NodejsLogo className="h-16 w-16 fill-secondary group-hover:fill-[#699F63] group-hover:transition-colors" />
							<p className="text-secondary group-hover:text-[#699F63] group-hover:transition-colors">
								Node.js
							</p>
						</a>
					</li>
				</ul>
			</section>
			<footer className="capitalize">2023 {t("mohamad taky")}</footer>
		</AnimatedPage>
	);
}
