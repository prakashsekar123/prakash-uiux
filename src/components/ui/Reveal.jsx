import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Fades + rises its children in once they scroll into view. Generic `as`
 *  prop lets it render a section, div, p, etc. without duplicating this
 *  animation logic per section. */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
