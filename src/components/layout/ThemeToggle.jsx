import { Sun, Moon } from "lucide-react";
import { bindHoverGrow, unbindHoverGrow } from "../../utils/cursorEffects";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onMouseEnter={bindHoverGrow}
      onMouseLeave={unbindHoverGrow}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
