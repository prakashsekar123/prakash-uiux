import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return undefined;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const quickX = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "none" });
    const quickY = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "none" });
    const quickRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const quickRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e) => {
      quickX(e.clientX);
      quickY(e.clientY);
      quickRingX(e.clientX);
      quickRingY(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
