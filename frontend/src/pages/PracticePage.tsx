import AnimatedPage from "~/components/shared/AnimatedPage";
import Quote from "~/components/practice/Quote";
import Stats from "~/components/practice/Stats";
import Keyboard from "~/components/practice/Keyboard";

export default function PracticePage() {
	return (
		<AnimatedPage className="mx-auto flex w-fit flex-col gap-4 p-4">
			<Quote />
			<Stats />
			<Keyboard />
		</AnimatedPage>
	);
}
