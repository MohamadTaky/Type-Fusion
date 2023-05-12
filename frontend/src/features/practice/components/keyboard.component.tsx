import KeyboardKey from "./keyboardKey.component";

export default function Keyboard() {
	return (
		<div dir="ltr" className="mx-auto w-fit rounded-md border  border-fill-2 bg-fill-3 p-4 font-mono">
			<div className="flex justify-center gap-2">
				<KeyboardKey value="`" keyCode="Backquote" />
				<KeyboardKey value="1" keyCode="Digit1" />
				<KeyboardKey value="2" keyCode="Digit2" />
				<KeyboardKey value="3" keyCode="Digit3" />
				<KeyboardKey value="4" keyCode="Digit4" />
				<KeyboardKey value="5" keyCode="Digit5" />
				<KeyboardKey value="6" keyCode="Digit6" />
				<KeyboardKey value="7" keyCode="Digit7" />
				<KeyboardKey value="8" keyCode="Digit8" />
				<KeyboardKey value="9" keyCode="Digit9" />
				<KeyboardKey value="0" keyCode="Digit0" />
				<KeyboardKey value="-" keyCode="Minus" />
				<KeyboardKey value="=" keyCode="Equal" />
				<KeyboardKey value="backspace" className="w-fit px-2" keyCode="Backspace" />
			</div>
			<div className="mt-2 flex justify-center gap-2">
				<KeyboardKey value="tab" className="w-fit flex-1 px-2" keyCode="Tab" />
				<KeyboardKey value="Q" keyCode="KeyQ" />
				<KeyboardKey value="W" keyCode="KeyW" />
				<KeyboardKey value="E" keyCode="KeyE" />
				<KeyboardKey value="R" keyCode="KeyR" />
				<KeyboardKey value="T" keyCode="KeyT" />
				<KeyboardKey value="Y" keyCode="KeyY" />
				<KeyboardKey value="U" keyCode="KeyU" />
				<KeyboardKey value="I" keyCode="KeyI" />
				<KeyboardKey value="O" keyCode="KeyO" />
				<KeyboardKey value="P" keyCode="KeyP" />
				<KeyboardKey value="{" keyCode="BracketLeft" />
				<KeyboardKey value="}" keyCode="BracketRight" />
				<KeyboardKey value="|" className="w-fit flex-1 px-2" keyCode="Backslash" />
			</div>
			<div className="mt-2 flex justify-center gap-2">
				<KeyboardKey value="caps lock" className="w-fit px-2" keyCode="CapsLock" />
				<KeyboardKey value="A" keyCode="KeyA" />
				<KeyboardKey value="S" keyCode="KeyS" />
				<KeyboardKey value="D" keyCode="KeyD" />
				<KeyboardKey value="F" keyCode="KeyF" />
				<KeyboardKey value="G" keyCode="KeyG" />
				<KeyboardKey value="H" keyCode="KeyH" />
				<KeyboardKey value="J" keyCode="KeyJ" />
				<KeyboardKey value="K" keyCode="KeyK" />
				<KeyboardKey value="L" keyCode="KeyL" />
				<KeyboardKey value=";" keyCode="Semicolon" />
				<KeyboardKey value="'" keyCode="Quote" />
				<KeyboardKey value="Enter" className="w-fit flex-1 px-2" keyCode="Enter" />
			</div>
			<div className="mt-2 flex justify-center gap-2">
				<KeyboardKey value="Shift" className="w-fit flex-1 px-2" keyCode="ShiftLeft" />
				<KeyboardKey value="Z" keyCode="KeyZ" />
				<KeyboardKey value="X" keyCode="KeyX" />
				<KeyboardKey value="C" keyCode="KeyC" />
				<KeyboardKey value="V" keyCode="KeyV" />
				<KeyboardKey value="B" keyCode="KeyB" />
				<KeyboardKey value="N" keyCode="KeyN" />
				<KeyboardKey value="M" keyCode="KeyM" />
				<KeyboardKey value="," keyCode="Comma" />
				<KeyboardKey value="." keyCode="Period" />
				<KeyboardKey value="/" keyCode="Slash" />
				<KeyboardKey value="Shift" className="w-fit flex-1 px-2" keyCode="ShiftRight" />
			</div>
			<div className="mt-2 flex justify-center gap-2">
				<KeyboardKey value="Ctrl" className="w-fit px-2" keyCode="ControlLeft" />
				<KeyboardKey value="Alt" className="w-fit px-2" keyCode="AltLeft" />
				<KeyboardKey value="__" className="w-full flex-1" keyCode="Space" />
				<KeyboardKey value="Alt" className="w-fit px-2" keyCode="AltRight" />
				<KeyboardKey value="Ctrl" className="w-fit px-2" keyCode="ControlRight" />
			</div>
		</div>
	);
}
