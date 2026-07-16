import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import MockupFrame from "./MockupFrame";

export default function Lightbox({ items, index, onClose, onNav }) {
  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNav]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.label}>
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
        <X size={20} />
      </button>
      <button
        type="button"
        className="lightbox-nav lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={22} />
      </button>
      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <MockupFrame kind={item.kind} label={item.label} img={item.img} />
      </div>
      <button
        type="button"
        className="lightbox-nav lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        aria-label="Next image"
      >
        <ChevronRight size={22} />
      </button>
      <div className="lightbox-counter">
        {index + 1} / {items.length}
      </div>
    </div>
  );
}
