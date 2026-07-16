import { INFO_CARDS, CONTACT } from "../../../data/content";
import { bindHoverGrow, unbindHoverGrow } from "../../../utils/cursorEffects";
import Reveal from "../../../components/ui/Reveal";
import MagneticButton from "../../../components/ui/MagneticButton";

export default function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="section-label">01 — About Me</div>
      <div className="about-grid">
        <Reveal className="about-text">
          <h2 className="section-title">
            Design that
            <br />
            <em>thinks</em> first.
          </h2>
          <p>
            I&apos;m <strong>Prakash S</strong>, a UI/UX Designer based in Coimbatore, specializing in user-centered
            design, AI-powered experiences, SaaS platforms, dashboards, and enterprise applications.
          </p>
          <p>
            I combine research, strategy, and visual design to create products that are both functional and
            delightful. With 2.5 years of dedicated craft, I&apos;ve shaped digital experiences across healthcare,
            education, finance, and AI verticals.
          </p>
          <blockquote className="about-quote">
            &quot;Great design is not just about aesthetics — it&apos;s about solving problems, simplifying
            complexity, and creating meaningful experiences that users enjoy.&quot;
          </blockquote>
          <MagneticButton>
            <a
              href={`mailto:${CONTACT.email}`}
              className="btn-primary"
              onMouseEnter={bindHoverGrow}
              onMouseLeave={unbindHoverGrow}
            >
              Get In Touch
            </a>
          </MagneticButton>
        </Reveal>

        <Reveal className="about-right" delay={0.15}>
          {INFO_CARDS.map((c) => (
            <div className="info-card" key={c.label} onMouseEnter={bindHoverGrow} onMouseLeave={unbindHoverGrow}>
              <div className="info-card-label">{c.label}</div>
              <div className="info-card-value">{c.value}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
