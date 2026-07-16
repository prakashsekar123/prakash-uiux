import { Sparkles } from "lucide-react";
import { MARQUEE_ITEMS } from "../../../data/content";

export default function MarqueeSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div className="marquee-item" key={`${item}-${i}`}>
            {item}{" "}
            <span className="marquee-dot">
              <Sparkles size={12} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
