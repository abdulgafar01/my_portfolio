import { Droplets } from "lucide-react";
import type { DataUsageCardProps } from "./types";

export default function DataUsageCard({ amount = "2364 MB", subtitle = "Used today" }: DataUsageCardProps) {
  return (
    <section className="flex h-full min-h-[118px] items-center rounded-[24px] border border-white/10 bg-[#181818] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.24)]">
      <div className="flex size-12 items-center justify-center rounded-full bg-[#35D16F] text-white">
        <Droplets className="size-5" />
      </div>
      <div className="ml-3 min-w-0">
        <p className="text-base font-semibold text-white">{amount}</p>
        <p className="text-sm text-white/65">{subtitle}</p>
      </div>
    </section>
  );
}
