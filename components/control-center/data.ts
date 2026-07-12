import { createElement } from "react";
import type { LucideIcon } from "lucide-react";
import { Wifi, Bluetooth, Radio, Sparkles, Flashlight, BellRing, MapPin, RotateCw, ScanLine, Focus, Camera, ShieldAlert, Share2, BatteryCharging, RefreshCcw, Plus } from "lucide-react";
import type { ToggleItem } from "./types";

const createIcon = (Icon: LucideIcon, size = "size-5") => createElement(Icon, { className: size });

export const quickSettings: ToggleItem[] = [
  { id: "airplane", label: "Airplane", icon: createIcon(Radio), active: false },
  { id: "hotspot", label: "Hotspot", icon: createIcon(Wifi), active: true },
  { id: "flashlight", label: "Flashlight", icon: createIcon(Flashlight), active: false },
  { id: "notifications", label: "Notifications", icon: createIcon(BellRing), active: true },
  { id: "location", label: "Location", icon: createIcon(MapPin), active: false },
  { id: "rotation", label: "Rotation Lock", icon: createIcon(RotateCw), active: false },
  { id: "screenshot", label: "Screenshot", icon: createIcon(ScanLine), active: false },
  { id: "focus", label: "Focus", icon: createIcon(Focus), active: false },
  { id: "camera", label: "Camera", icon: createIcon(Camera), active: false },
  { id: "dnd", label: "Do Not Disturb", icon: createIcon(ShieldAlert), active: true },
  { id: "nearby", label: "Nearby Share", icon: createIcon(Share2), active: false },
  { id: "battery", label: "Battery Saver", icon: createIcon(BatteryCharging), active: false },
  { id: "qr", label: "QR Scanner", icon: createIcon(ScanLine), active: false },
  { id: "wallet", label: "Wallet", icon: createIcon(Sparkles), active: false },
  { id: "sync", label: "Sync", icon: createIcon(RefreshCcw), active: false },
  { id: "plus", label: "Plus", icon: createIcon(Plus), active: false },
];

export const connectivityButtons = [
  { id: "wifi", label: "Wi-Fi", icon: createIcon(Wifi, "size-6"), active: true },
  { id: "bluetooth", label: "Bluetooth", icon: createIcon(Bluetooth, "size-6"), active: false },
];

export const sliderLabels = {
  brightness: "Brightness",
  volume: "Volume",
};

export const toggleRows = [
  quickSettings.slice(0, 2),
  quickSettings.slice(2, 6),
  quickSettings.slice(6, 10),
  quickSettings.slice(10, 14),
  quickSettings.slice(14, 16),
];
