export const CONTROL_CENTER_TOKENS = {
  background: "#2B2B2B",
  surface: "#181818",
  blue: "#2D7DFF",
  green: "#35D16F",
  white: "#FFFFFF",
  secondaryText: "rgba(255,255,255,0.65)",
  divider: "rgba(255,255,255,0.08)",
  cardRadius: "2rem",
  pillRadius: "9999px",
  circleSize: 64,
  toggleDiameter: 88,
  toggleGap: 20,
  maxWidth: 420,
} as const;

export const CONTROL_CENTER_ANIMATION = {
  panelInitial: { opacity: 0, y: 32 },
  panelAnimate: { opacity: 1, y: 0 },
  panelTransition: { duration: 0.5, ease: "easeOut" },
  buttonHover: { scale: 1.04 },
  buttonTap: { scale: 0.96 },
} as const;
