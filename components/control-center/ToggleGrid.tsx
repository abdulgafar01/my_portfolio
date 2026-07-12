import { quickSettings, toggleRows } from "./data";
import ToggleButton from "./ToggleButton";

export default function ToggleGrid() {
  return (
    <div className="mt-1 flex flex-col gap-3 sm:gap-4">
      {toggleRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-3 sm:gap-4">
          {row.map((item) => (
            <ToggleButton key={item.id} icon={item.icon} label={item.label} active={item.active} />
          ))}
          {row.length < 4 && Array.from({ length: 4 - row.length }).map((_, index) => <div key={`spacer-${rowIndex}-${index}`} className="h-22" />)}
        </div>
      ))}
    </div>
  );
}
