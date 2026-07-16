/**
 * Renders a premium placeholder mockup so the case-study page looks
 * finished before real screenshots exist. Pass `img` to replace the
 * placeholder with an actual screenshot — the frame stays the same.
 *
 * kind: "desktop" | "mobile" | "dashboard"
 */
export default function MockupFrame({ kind = "desktop", label, img, onClick }) {
  const clickable = typeof onClick === "function";

  const content = img ? (
    <img src={img} alt={label} className="mockup-real-img" loading="lazy" decoding="async" />
  ) : (
    <div className="mockup-placeholder" aria-hidden="true">
      <div className="mockup-placeholder-glow" />
      <div className="mockup-placeholder-lines">
        <span style={{ width: "62%" }} />
        <span style={{ width: "84%" }} />
        <span style={{ width: "40%" }} />
      </div>
      <div className="mockup-placeholder-blocks">
        <div className="mockup-block" />
        <div className="mockup-block" />
        <div className="mockup-block" />
      </div>
    </div>
  );

  const interactiveProps = clickable
    ? {
        onClick,
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  if (kind === "mobile") {
    return (
      <div className={`mockup mockup-mobile ${clickable ? "clickable" : ""}`} {...interactiveProps}>
        <div className="mockup-phone-notch" />
        <div className="mockup-phone-screen">{content}</div>
        {label && <div className="mockup-caption">{label}</div>}
      </div>
    );
  }

  return (
    <div className={`mockup mockup-${kind} ${clickable ? "clickable" : ""}`} {...interactiveProps}>
      <div className="mockup-chrome">
        <span className="mockup-dot" />
        <span className="mockup-dot" />
        <span className="mockup-dot" />
      </div>
      <div className="mockup-screen">{content}</div>
      {label && <div className="mockup-caption">{label}</div>}
    </div>
  );
}
