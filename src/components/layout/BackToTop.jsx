import { ChevronUp } from "lucide-react";
import { bindHoverGrow, unbindHoverGrow } from "../../utils/cursorEffects";

export default function BackToTop({ show }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      className={`back-to-top ${show ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onMouseEnter={bindHoverGrow}
      onMouseLeave={unbindHoverGrow}
    >
      <ChevronUp size={20} />
    </button>
  );
}
