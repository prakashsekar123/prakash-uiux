import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Wraps a single button/link child and nudges it toward the cursor while
 *  hovered, snapping back with a light elastic ease on leave. Self-contained
 *  per instance — no global querySelectorAll pass needed. */
export default function MagneticButton({ children, className = "" }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const target = wrap?.querySelector("a, button");
    if (!wrap || !target) return undefined;

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(target, { x: relX * 0.25, y: relY * 0.35, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(target, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1,0.4)" });

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className={`btn-magnetic ${className}`} ref={wrapRef}>
      {children}
    </div>
  );
}
