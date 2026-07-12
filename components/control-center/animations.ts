import type { Variants } from "motion";

export const panelVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, delay, ease: "easeOut" },
  }),
};

export const buttonMotion = {
  whileHover: { scale: 1.04, y: -1 },
  whileTap: { scale: 0.96 },
};

export const sectionMotion = {
  initial: "hidden",
  animate: "visible",
  variants: panelVariants,
};
