import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineItem from "./TimelineItem";

gsap.registerPlugin(ScrollTrigger);

/** Centered timeline with alternating cards, a spine that fills as you
 *  scroll past it, and each dot popping in as its card enters view.
 *  items: [{ period, company, location, role, points: [] }] */
export default function Timeline({ items }) {
  const wrapRef = useRef(null);
  const spineFillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray(".tl-item");

      els.forEach((el) => {
        const fromLeft = el.classList.contains("tl-left");
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: fromLeft ? -60 : 60, y: 24 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );

        gsap.fromTo(
          el.querySelector(".tl-dot"),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2.4)",
            scrollTrigger: { trigger: el, start: "top 78%" },
          }
        );
      });

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top 65%",
        end: "bottom 70%",
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(spineFillRef.current, { height: `${self.progress * 100}%` });
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div className="tl-wrap" ref={wrapRef}>
      <div className="tl-spine">
        <div className="tl-spine-fill" ref={spineFillRef} />
      </div>
      {items.map((item, i) => (
        <TimelineItem key={item.company + item.period} item={item} side={i % 2 === 0 ? "left" : "right"} />
      ))}
    </div>
  );
}
