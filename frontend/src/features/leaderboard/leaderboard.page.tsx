import { useTranslation } from "react-i18next";
import AnimatedPage from "~/common/components/animatedPage.component";
import useUserAuthQuery from "../auth/hooks/useUserAuthQuery.hook";
import useLeaderboard from "./hooks/useLeaderboardQuery.hook";

export default function LeaderboardPage() {
	const { t } = useTranslation();
	const { data } = useLeaderboard();
	const { data: userAuth } = useUserAuthQuery();
	return (
		<AnimatedPage className="p-4">
			<div className="custom-scroll relative mx-auto h-96 w-11/12 overflow-y-auto rounded-md bg-fill-3">
				<table className="w-full text-center">
					<thead>
						<tr>
							<th className="sticky top-0 border-b-2 border-accent bg-fill-2 p-4 capitalize text-start">#</th>
							<th className="sticky top-0 border-b-2 border-accent bg-fill-2 p-4 capitalize">
								{t("name")}
							</th>
							<th className="sticky top-0 border-b-2 border-accent bg-fill-2 p-4 capitalize">
								{t("speed")}
							</th>
							<th className="sticky top-0 border-b-2 border-accent bg-fill-2 p-4 capitalize">
								{t("accuracy")}
							</th>
							<th className="sticky top-0 border-b-2 border-accent bg-fill-2 p-4 capitalize">
								{t("score")}
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item: any, i: number) => (
							<tr
								key={item._id}
								className={`bg-opacity-50 hover:bg-opacity-100 ${
									userAuth?._id === item._id ? "bg-accent" : "bg-fill-1"
								}`}>
								<td className={`px-4 py-4`}>
									<div
										className={`w-8 h-8 rounded-full grid place-items-center ${
											i === 0 ? "bg-yellow-600" : i === 1 ? "bg-slate-600" : i === 2 ? "bg-stone-600" : ""
										}`}>
										{i + 1}
									</div>
								</td>
								<td className="px-4 py-4">{item.username}</td>
								<td className="px-4 py-4">
									{item.latestSpeed} <span className="text-sm">{t("wpm")}</span>
								</td>
								<td dir="ltr" className="px-4 py-4">
									{item.latestAccuracy} <span className="text-sm">%</span>
								</td>
								<td className="px-4 py-4">{item.latestScore}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</AnimatedPage>
	);
}
