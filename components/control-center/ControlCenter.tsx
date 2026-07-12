"use client";

import { m } from "motion/react";
import BottomGestureBar from "./BottomGestureBar";
import ConnectivityCard from "./ConnectivityCard";
import DataUsageCard from "./DataUsageCard";
import MusicPlayerCard from "./MusicPlayerCard";
import StatusBar from "./StatusBar";
import ToggleGrid from "./ToggleGrid";
import VerticalSlider from "./VerticalSlider";
import { CONTROL_CENTER_ANIMATION } from "./constants";
import { sectionMotion } from "./animations";

export default function ControlCenter() {
  return (
    <m.main
      initial={CONTROL_CENTER_ANIMATION.panelInitial}
      animate={CONTROL_CENTER_ANIMATION.panelAnimate}
      transition={CONTROL_CENTER_ANIMATION.panelTransition}
      className="min-h-screen w-full overflow-hidden bg-[#2B2B2B] px-3 py-3 text-white sm:px-6 sm:py-6"
    //   style={{
    //     backgroundImage: "radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 45%)",
    //   }}
    >
      <m.div
        {...sectionMotion}
        className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-105 flex-col justify-center gap-3 rounded-[36px] border border-white/10 bg-[#141414]/70 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:gap-4 sm:p-4"
      >
        {/* <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <StatusBar />
        </m.div>
       */}
        <div className="grid grid-cols-2 gap-3">
          <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.08 }}>
            <ConnectivityCard />
          </m.div>
          <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.12 }}>
            <MusicPlayerCard />
          </m.div>
        </div>

        <div className="mt-1 grid grid-cols-[1.15fr_0.85fr_0.85fr] gap-3">
          <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.16 }}>
            <DataUsageCard />
          </m.div>
          <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
            <VerticalSlider variant="brightness" value={72} />
          </m.div>
          <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.24 }}>
            <VerticalSlider variant="volume" value={58} />
          </m.div>
        </div>

        <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.28 }}>
          <ToggleGrid />
        </m.div>
        <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.32 }}>
          <BottomGestureBar />
        </m.div>
      </m.div>
    </m.main>
  );
}
