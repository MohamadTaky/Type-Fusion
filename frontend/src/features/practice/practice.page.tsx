import AnimatedPage from "src/common/components/animatedPage.component";
import Quote from "./components/quote.component";
import Stats from "./components/Stats.component";
import Keyboard from "./components/keyboard.component";

export default function PracticePage() {
	return (
		<AnimatedPage className="mx-auto flex w-fit flex-col gap-4 p-4">
			<Quote />
			<Stats />
			<Keyboard />
		</AnimatedPage>
	);
}
