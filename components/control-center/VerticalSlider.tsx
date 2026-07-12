import { m } from "motion/react";
import { SunMedium, Speaker } from "lucide-react";
import { useEffect, useState } from "react";
import type { VerticalSliderProps } from "./types";

export default function VerticalSlider({ variant, value = 70, onChange, disabled = false }: VerticalSliderProps) {
  const isBrightness = variant === "brightness";
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const fill = Math.max(0.08, displayValue / 100);
  const label = isBrightness ? "Brightness" : "Volume";

  const updateValue = (nextValue: number) => {
    if (disabled) return;
    const clampedValue = Math.min(100, Math.max(0, nextValue));
    setDisplayValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      updateValue(displayValue + 1);
    } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      updateValue(displayValue - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      updateValue(0);
    } else if (event.key === "End") {
      event.preventDefault();
      updateValue(100);
    }
  };

  return (
    <div className="flex min-h-29.5 flex-col items-center justify-between rounded-[24px] border border-white/10 bg-[#181818] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.24)]">
      <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70">
        {isBrightness ? <SunMedium className="size-4" /> : <Speaker className="size-4" />}
      </div>
      <div
        role="slider"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={displayValue}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        className="my-2 flex h-28 w-3 items-end overflow-hidden rounded-full bg-white/15 p-[2px] shadow-inner shadow-black/20"
      >
        <m.div
          className={`w-full rounded-full ${isBrightness ? "bg-white" : "bg-white"}`}
          animate={{ height: `${fill * 100}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>
      <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70">
        {isBrightness ? <SunMedium className="size-4 text-[#FFB347]" /> : <Speaker className="size-4" />}
      </div>
    </div>
  );
}
