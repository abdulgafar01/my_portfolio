import type { BottomGestureBarProps } from "./types";

export default function BottomGestureBar({ className = "" }: BottomGestureBarProps) {
  return (
    <div className={`mt-4 flex justify-center ${className}`.trim()}>
      <div className="h-2 w-28 rounded-full bg-white/20 shadow-[0_0_16px_rgba(255,255,255,0.12)]" />
    </div>
  );
}
