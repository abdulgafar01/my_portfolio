export type SliderVariant = "brightness" | "volume";

export interface ToggleItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export interface VerticalSliderProps {
  variant: SliderVariant;
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export interface ToggleButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface StatusBarProps {
  carrierLabel?: string;
  networkLabel?: string;
  batteryPercent?: number;
}

export interface HeaderActionsProps {
  onSettingsClick?: () => void;
  onEditClick?: () => void;
}

export interface ConnectivityCardProps {
  wifiActive?: boolean;
  bluetoothActive?: boolean;
  networkLabel?: string;
}


export interface DataUsageCardProps {
  amount?: string;
  subtitle?: string;
}

export interface BottomGestureBarProps {
  className?: string;
}
