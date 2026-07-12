import { m } from "motion/react";
import type { ToggleButtonProps } from "./types";
import { buttonMotion } from "./animations";

export default function ToggleButton({ icon, label, active = false, disabled = false, onClick }: ToggleButtonProps) {
  return (
    <m.button
      type="button"
      aria-label={label}
      aria-pressed={active}
      aria-disabled={disabled}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : buttonMotion.whileHover}
      whileTap={disabled ? undefined : buttonMotion.whileTap}
      className={`flex h-22 w-22 flex-col items-center justify-center gap-2 rounded-full border border-white/10 text-center text-[11px] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-all duration-200 outline-none ${
        active ? "bg-[#2D7DFF] text-white shadow-[#2D7DFF]/20" : "bg-[#181818] text-white/80"
      } ${disabled ? "opacity-50" : ""} focus-visible:ring-2 focus-visible:ring-[#2D7DFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2B2B]`}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="leading-none">{label}</span>
    </m.button>
  );
}
