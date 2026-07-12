import { m } from "motion/react";
import { Cast, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { buttonMotion } from "./animations";

export default function MusicPlayerCard() {
  return (
    <section className="min-h-47 rounded-[32px] border border-white/10 bg-[#181818] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.24)]">
      <div className="flex items-start justify-between gap-3">
        <m.button type="button" aria-label="Cast audio" whileHover={buttonMotion.whileHover} whileTap={buttonMotion.whileTap} className="rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white">
          <Cast className="size-4" />
        </m.button>
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <m.button type="button" aria-label="Previous track" whileHover={buttonMotion.whileHover} whileTap={buttonMotion.whileTap} className="rounded-full bg-white/10 p-3 text-white/70 transition hover:bg-white/20 hover:text-white">
          <ChevronLeft className="size-5" />
        </m.button>
        <m.button type="button" aria-label="Play or pause" whileHover={buttonMotion.whileHover} whileTap={buttonMotion.whileTap} className="flex size-14 items-center justify-center rounded-full bg-[#35D16F] text-white shadow-lg shadow-[#35D16F]/25 transition">
          <Play className="ml-1 size-6" />
        </m.button>
        <m.button type="button" aria-label="Next track" whileHover={buttonMotion.whileHover} whileTap={buttonMotion.whileTap} className="rounded-full bg-white/10 p-3 text-white/70 transition hover:bg-white/20 hover:text-white">
          <ChevronRight className="size-5" />
        </m.button>
      </div>
    </section>
  );
}
