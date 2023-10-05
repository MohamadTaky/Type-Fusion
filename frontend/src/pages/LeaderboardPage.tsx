import LeaderboardTable from "~/components/leaderboard/LeaderboardTable";
import AnimatedPage from "~/components/shared/AnimatedPage";

export default function LeaderboardPage() {
	return (
		<AnimatedPage className="p-4">
			<div className="custom-scroll relative mx-auto h-96 w-11/12 overflow-y-auto rounded-md bg-fill-3">
				<LeaderboardTable />
			</div>
		</AnimatedPage>
	);
}
