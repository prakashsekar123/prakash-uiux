import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CountUp({ stat }) {
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || stat.static) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        if (done.current) return;
        done.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = (stat.decimal ? obj.val.toFixed(1) : Math.round(obj.val)) + stat.suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [stat]);

  return (
    <span className="stat-num" ref={ref}>
      {stat.static || "0"}
    </span>
  );
}
