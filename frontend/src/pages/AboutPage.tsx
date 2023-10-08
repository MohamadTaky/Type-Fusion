import { useTranslation } from "react-i18next";
import AnimatedPage from "@/components/shared/AnimatedPage";
import { ReactComponent as ExpressLogo } from "../assets/express-logo.svg";
import { ReactComponent as MongodbLogo } from "../assets/mongodb-logo.svg";
import { ReactComponent as NodejsLogo } from "../assets/nodejs-logo.svg";
import { ReactComponent as ReactLogo } from "../assets/react-logo.svg";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <AnimatedPage className="mx-auto flex h-full w-fit flex-col justify-between gap-4 bg-fill-3 p-4 text-center">
      <header className="max-w-[55ch] leading-relaxed">{t("about info")}</header>
      <section>
        <p className="mb-4 text-xl font-bold capitalize">{t("made with")}</p>
        <ul className="flex justify-between gap-4">
          <li>
            <a href="https://www.mongodb.com/" className="group" target="_blank">
              <MongodbLogo className="mx-auto h-16 w-16 fill-secondary transition duration-150 group-hover:fill-[#4DB33D]" />
              <p className="text-secondary duration-150 group-hover:text-[#4DB33D]">MongoDB</p>
            </a>
          </li>
          <li>
            <a href="https://expressjs.com/" className="group" target="_blank">
              <ExpressLogo className="mx-auto h-16 w-16 fill-secondary transition duration-150 group-hover:fill-black" />
              <p className="text-secondary duration-150 group-hover:text-black">Express.js</p>
            </a>
          </li>
          <li>
            <a href="https://reactjs.org/" className="group" target="_blank">
              <ReactLogo className="mx-auto h-16 w-16 fill-secondary transition duration-150 group-hover:fill-[#61DBFB]" />
              <p className="text-secondary duration-150 group-hover:text-[#61DBFB]">React</p>
            </a>
          </li>
          <li>
            <a href="https://nodejs.org/" className="group" target="_blank">
              <NodejsLogo className="mx-auto h-16 w-16 fill-secondary transition duration-150 group-hover:fill-[#699F63]" />
              <p className="text-secondary duration-150 group-hover:text-[#699F63]">Node.js</p>
            </a>
          </li>
        </ul>
      </section>
      <footer className="capitalize">2023 {t("mohamad taky")}</footer>
    </AnimatedPage>
  );
}
