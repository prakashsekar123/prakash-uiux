import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ROLES, STATS, CHIPS } from "../../../data/content";
import { bindHoverGrow, unbindHoverGrow } from "../../../utils/cursorEffects";
import useTypewriter from "../../../hooks/useTypewriter";
import CountUp from "../../../components/ui/CountUp";
import MagneticButton from "../../../components/ui/MagneticButton";

const PARTICLE_COUNT = 18;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  top: `${(i * 31) % 100}%`,
  animationDelay: `${(i % 6) * 0.7}s`,
  animationDuration: `${6 + (i % 5)}s`,
}));

// Pulls the pill toward the cursor while hovered, snaps back with a light
// elastic ease on leave. Applied to the INNER pill div, not the outer
// positioned/floating wrapper — that keeps this from fighting the chip's
// CSS keyframe float animation, which also animates `transform`.
const magneticChipMove = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const relX = e.clientX - rect.left - rect.width / 2;
  const relY = e.clientY - rect.top - rect.height / 2;
  gsap.to(el, { x: relX * 0.45, y: relY * 0.45, duration: 0.3, ease: "power2.out" });
};

const magneticChipLeave = (e) => {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
};

export default function HeroSection() {
  const roleText = useTypewriter(ROLES);

  // Parallax: floating blobs drift slightly toward the cursor.
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      document.querySelectorAll(".hero .blob").forEach((b) => {
        const depth = parseFloat(b.dataset.depth) || 20;
        b.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Entrance timeline, once, on mount.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.9 });
      tl.from(".hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.7 })
        .from(".hero-line span", { yPercent: 110, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, "-=0.4")
        .from(".role-rotator", { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.3")
        .from(".hero-sub", { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.35")
        .from(".hero-actions", { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.35")
        .from(".hero-stats", { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.35")
        .from(".hero-visual", { autoAlpha: 0, scale: 0.9, duration: 0.9 }, "-=0.9");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home">
      <div className="blob blob-1" data-depth="30" />
      <div className="blob blob-2" data-depth="18" />
      <div className="blob blob-3" data-depth="45" />
      <div className="particle-field" aria-hidden="true">
        {particles.map((style, i) => (
          <span key={i} className="particle" style={style} />
        ))}
      </div>

      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="pulse-dot" />
          Available for Opportunities
        </div>
        <h1>
          <span className="hero-line">
            <span>Designing</span>
          </span>
          <span className="hero-line">
            <span>experiences that</span>
          </span>
          <span className="hero-line">
            <span className="grad">matter.</span>
          </span>
        </h1>
        <div className="role-rotator">
          <span className="bracket">&lt;</span>
          <span>{roleText}</span>
          <span className="cursor-blink">|</span>
          <span className="bracket">/&gt;</span>
        </div>
        <p className="hero-sub">
          2.5 years turning complex workflows into seamless digital products across AI, SaaS, Healthcare, Education,
          Finance &amp; Enterprise platforms.
        </p>
        <div className="hero-actions">
          <MagneticButton>
            <a href="#projects" className="btn-primary" onMouseEnter={bindHoverGrow} onMouseLeave={unbindHoverGrow}>
              View My Work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contact" className="btn-ghost" onMouseEnter={bindHoverGrow} onMouseLeave={unbindHoverGrow}>
              Let&apos;s Talk <ArrowRight size={15} />
            </a>
          </MagneticButton>
        </div>
        <div className="hero-stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <CountUp stat={s} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-visual">
          <div className="orbit-ring" />
          <div className="orbit-ring-2" />
          {CHIPS.map((c) => (
            // Outer div: keeps its position (chip-1..chip-6) and the CSS
            // keyframe float animation untouched. Inner div: the pill that
            // actually gets the magnetic pull toward the cursor.
            <div key={c.label} className={c.pos}>
              <div
                className={`skill-chip ${c.accent ? "accent" : ""}`}
                onMouseMove={magneticChipMove}
                onMouseLeave={magneticChipLeave}
                onMouseEnter={bindHoverGrow}
                onFocus={bindHoverGrow}
                onBlur={unbindHoverGrow}
              >
                {c.label}
              </div>
            </div>
          ))}
          <div className="hero-center-card">
            <div className="hero-center-icon">P</div>
            <div className="hero-center-name">Prakash S</div>
            <div className="hero-center-role">UX · UI · AI Design</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-track">
          <div className="scroll-dot" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}