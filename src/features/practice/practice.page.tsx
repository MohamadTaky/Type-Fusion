import AnimatedPage from "~/components/animatedPage.component";
import Quote from "./components/quote.component";
import Stats from "./components/Stats.component";
import Keyboard from "./components/keyboard.component";

export default function PracticePage() {
	return (
		<AnimatedPage className="p-4 w-9/12 mx-auto flex flex-col gap-4">
			<Quote />
			<Stats />
			<Keyboard />
		</AnimatedPage>
	);
}
