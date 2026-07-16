import { useRef, useState, useCallback } from "react";

export default function BeforeAfter({ before, after }) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onDown = (e) => {
    dragging.current = true;
    setFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    setFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <div
      className="before-after"
      ref={trackRef}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
      }}
    >
      <div className="ba-panel ba-before">
        <span className="ba-label">Before</span>
        <p>{before}</p>
      </div>
      <div className="ba-panel ba-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <span className="ba-label">After</span>
        <p>{after}</p>
      </div>
      <div className="ba-handle" style={{ left: `${pos}%` }}>
        <div className="ba-handle-grip">
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
