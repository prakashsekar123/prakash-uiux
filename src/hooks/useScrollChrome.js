import { useEffect, useRef, useState } from "react";
import { rafThrottle } from "../utils/raf";

export default function useScrollChrome({ trackSections = false } = {}) {
  const [navHidden, setNavHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = rafThrottle(() => {
      const y = window.scrollY;
      setNavHidden(y > lastScroll.current && y > 200);
      setScrolled(y > 40);
      lastScroll.current = y;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
      setShowBackToTop(y > 800);

      if (trackSections) {
        let current = "home";
        document.querySelectorAll("section[id]").forEach((section) => {
          if (y >= section.offsetTop - 140) current = section.id;
        });
        setActiveSection(current);
      }
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [trackSections]);

  return { navHidden, scrolled, progress, showBackToTop, activeSection };
}