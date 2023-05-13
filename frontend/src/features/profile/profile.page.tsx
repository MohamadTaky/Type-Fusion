import AnimatedPage from "~/common/components/animatedPage.component";
import { useTranslation } from "react-i18next";
import useUserAuthQuery from "../auth/hooks/useUserAuthQuery.hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Username from "./components/username.component";

export default function ProfilePage() {
	const { t } = useTranslation();
	const { data: userAuth } = useUserAuthQuery();
	const navigate = useNavigate();
	useEffect(() => {
		if (!userAuth) navigate("/");
	}, [userAuth]);

	return (
		<AnimatedPage>
			<div className="m-4 mx-auto flex w-9/12 flex-col gap-4 bg-fill-3 p-4">
				<Username />
				<div className="flex items-center justify-between gap-4">
					<p className="first-letter:uppercase">
						{t("email")} : {userAuth?.email}
					</p>
				</div>
			</div>
		</AnimatedPage>
	);
}
