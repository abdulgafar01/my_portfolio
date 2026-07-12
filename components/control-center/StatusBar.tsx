import { BatteryFull, Signal, Wifi as WifiIcon } from "lucide-react";
import type { StatusBarProps } from "./types";

export default function StatusBar({ carrierLabel = "MTN NG", networkLabel = "4G", batteryPercent = 10 }: StatusBarProps) {
  return (
    <div className="mb-5 flex items-center justify-between text-[13px] font-medium text-white/85">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Signal className="size-3.5" />
          <span>{networkLabel}</span>
        </div>
        <span className="opacity-90">{carrierLabel}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>{batteryPercent}%</span>
        <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1">
          <WifiIcon className="size-3" />
          <BatteryFull className="size-3.5" />
        </div>
      </div>
    </div>
  );
}
