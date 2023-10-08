import React from "react";
import usePracticeStore from "@/store/usePracticeStore";
import cn from "@/utils/cn";

type KeyboardKeyProps = {
  value: React.ReactNode;
  className?: string;
  keyCode: string;
};

export default function KeyboardKey({ value, keyCode, className }: KeyboardKeyProps) {
  const key = usePracticeStore((store) => store.keys.get(keyCode))!;
  return (
    <div
      className={cn(
        "inline-block h-8 w-8 rounded-sm text-center text-xs font-bold leading-8 transition",
        key.pressed ? (key.correct ? "bg-green-500" : "bg-error-2") : "bg-fill-2",
        className
      )}
    >
      {value}
    </div>
  );
}
