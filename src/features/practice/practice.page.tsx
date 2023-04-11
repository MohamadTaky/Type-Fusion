import AnimatedPage from "~/components/animatedPage.component";
import Quote from "./components/quote.component";
import Stats from "./components/Stats.component";
import Keyboard from "./components/keyboard.component";

export default function PracticePage() {
	return (
		<AnimatedPage>
			<Quote />
			<Stats />
			<Keyboard />
		</AnimatedPage>
	);
}
