import { m } from "motion/react";
import { Bluetooth, Wifi } from "lucide-react";
import type { ConnectivityCardProps } from "./types";
import { buttonMotion } from "./animations";

export default function ConnectivityCard({ wifiActive = true, bluetoothActive = false, networkLabel = "MTN NG" }: ConnectivityCardProps) {
  return (
    <section className="min-h-[188px] rounded-[32px] border border-white/10 bg-[#181818] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between gap-3">
        <m.button
          type="button"
          aria-label="Toggle Wi-Fi"
          whileHover={buttonMotion.whileHover}
          whileTap={buttonMotion.whileTap}
          className={`flex size-16 items-center justify-center rounded-full border border-white/10 transition ${wifiActive ? "bg-[#2D7DFF] text-white" : "bg-white/5 text-white/70"}`}
        >
          <Wifi className="size-7" />
        </m.button>
        <m.button
          type="button"
          aria-label="Toggle Bluetooth"
          whileHover={buttonMotion.whileHover}
          whileTap={buttonMotion.whileTap}
          className={`flex size-16 items-center justify-center rounded-full border border-white/10 transition ${bluetoothActive ? "bg-[#2D7DFF] text-white" : "bg-white/5 text-white/70"}`}
        >
          <Bluetooth className="size-7" />
        </m.button>
      </div>
      <div className="mt-6 flex items-center justify-center rounded-full bg-white/10 px-4 py-3 text-sm font-medium text-white/85">
        <span className="mr-2 inline-flex size-2 rounded-full bg-[#35D16F]" />
        <span>{networkLabel}</span>
      </div>
    </section>
  );
}
