import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../../data/projects";
import { bindHoverGrow, unbindHoverGrow } from "../../../utils/cursorEffects";
import { tiltHandler, resetTilt } from "../../../utils/tiltEffect";
import Reveal from "../../../components/ui/Reveal";

export default function ProjectsSection() {
  const navigate = useNavigate();

  return (
    <section className="projects" id="projects">
      <div className="section-label">02 — Selected Work</div>
      <Reveal as="h2" className="section-title">
        Case studies that <em>shipped</em>.
      </Reveal>
      <Reveal as="p" className="section-desc" delay={0.1}>
        A curated selection of products I&apos;ve designed — from AI platforms to healthcare tools, each solving a
        real, measurable problem.
      </Reveal>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <Reveal as="article" key={p.id} delay={(i % 3) * 0.08}>
            <div
              className="project-card"
              onClick={() => navigate(`/project/${p.id}`)}
              onMouseMove={tiltHandler}
              onMouseLeave={(e) => {
                resetTilt(e);
                unbindHoverGrow();
              }}
              onMouseEnter={bindHoverGrow}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/project/${p.id}`);
              }}
            >
              <div className="project-arrow">
                <ArrowUpRight size={16} />
              </div>
              <div className="project-thumb">
                {p.img ? (
                  <img src={p.img} alt={p.title} className="project-thumb-img" />
                ) : (
                  <>
                    <span className="project-thumb-text">{p.id.slice(0, 2).toUpperCase()}</span>
                    <div className="project-thumb-icon">{p.title.charAt(0)}</div>
                  </>
                )}
              </div>
              <div className="project-info">
                <span className="project-tag">{p.tag}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.subtitle}</p>
                <div className="project-meta">
                  {p.tags.slice(0, 3).map((t) => (
                    <span className="project-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}