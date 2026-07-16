import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../../data/projects";
import { bindHoverGrow, unbindHoverGrow } from "../../utils/cursorEffects";
import { rafThrottle } from "../../utils/raf";
import MockupFrame from "../../components/ui/MockupFrame";
import Lightbox from "../../components/ui/Lightbox";
import BeforeAfter from "../../components/ui/BeforeAfter";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);
  const [scrollPct, setScrollPct] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const pageRef = useRef(null);

  // Land at the top of the page whenever the project changes — otherwise
  // clicking "Next Project" keeps the previous scroll position.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    if (!project) return undefined;

    const onScroll = rafThrottle(() => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? Math.min((window.scrollY / docH) * 100, 100) : 0);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const raf = requestAnimationFrame(() => {
      gsap.context(() => {
        gsap.utils.toArray(".cs-sr").forEach((node, i) => {
          gsap.fromTo(
            node,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              delay: Math.min(i * 0.02, 0.2),
              scrollTrigger: { trigger: node, start: "top 92%" },
            }
          );
        });
      }, pageRef);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [project]);

  if (!project) {
    return (
      <section style={{ paddingTop: 160, textAlign: "center" }}>
        <h1 className="section-title">Project not found</h1>
        <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: 20 }}>
          Back to Home
        </Link>
      </section>
    );
  }

  const nextProject = PROJECTS.find((p) => p.id === project.nextId);
  const navLightbox = (dir) => {
    setLightboxIndex((i) => {
      const len = project.gallery.length;
      return (i + dir + len) % len;
    });
  };

  return (
    <div className="cs-page" ref={pageRef}>
      <div className="cs-progress-bar" style={{ width: `${scrollPct}%` }} />
      <div className="cs-topbar">
        <button
          type="button"
          className="cs-back"
          onClick={() => navigate(-1)}
          onMouseEnter={bindHoverGrow}
          onMouseLeave={unbindHoverGrow}
        >
          <ArrowLeft size={16} className="cs-back-arrow" /> Back to Work
        </button>
        <span className="cs-topbar-tag">{project.tag}</span>
      </div>

      <div className="cs-hero">
        <div className="cs-hero-bg" />
        <div className="cs-hero-inner">
          <div className="cs-num cs-sr">Case Study · {project.tag}</div>
          <h1 className="cs-title cs-sr">
            {project.title}
            <br />
            <span className="grad">{project.subtitle}</span>
          </h1>
          <div className="cs-meta-row cs-sr">
            <div className="cs-meta-item">
              <span className="cs-meta-label">Company</span>
              <span className="cs-meta-value">{project.company}</span>
            </div>
            {/* <div className="cs-meta-item">
              <span className="cs-meta-label">Year</span>
              <span className="cs-meta-value">{project.year}</span>
            </div> */}
            <div className="cs-meta-item">
              <span className="cs-meta-label">Role</span>
              <span className="cs-meta-value">{project.role}</span>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">Type</span>
              <span className="cs-meta-value">{project.type}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cs-body">
        <div className="cs-section">
          <div className="cs-section-num cs-sr">00 — Overview</div>
          <p className="cs-sr">{project.overview}</p>
        </div>

        <div className="cs-section">
          <div className="cs-section-num cs-sr">01 — Problem Statement</div>
          <h2 className="cs-sr" dangerouslySetInnerHTML={{ __html: project.problem.heading }} />
          <p className="cs-sr" dangerouslySetInnerHTML={{ __html: project.problem.body }} />
          <blockquote className="cs-quote cs-sr">{project.problem.quote}</blockquote>
        </div>

        {project.solution && (
          <div className="cs-section">
            <div className="cs-section-num cs-sr">02 — The Solution</div>
            <h2 className="cs-sr">
              What we <em>changed</em>
            </h2>
            <p className="cs-sr">{project.solution}</p>
          </div>
        )}

        <div className="cs-section">
          <div className="cs-section-num cs-sr">03 — Design Process</div>
          <h2 className="cs-sr">
            How I <em>approached</em> it
          </h2>
          <div className="cs-process">
            {project.process.map((s, i) => (
              <div className="cs-process-step cs-sr" key={s.title}>
                <div className="cs-step-num">0{i + 1}</div>
                <div>
                  <div className="cs-step-title">{s.title}</div>
                  <div className="cs-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {project.gallery && (
          <div className="cs-section">
            <div className="cs-section-num cs-sr">04 — Selected Screens</div>
            <h2 className="cs-sr">
              A closer <em>look</em>
            </h2>
            <p className="cs-sr" style={{ marginBottom: 28 }}>
              Placeholder mockups shown below — swap in real product screenshots any time. Click any frame to view it
              larger.
            </p>
            <div className="cs-gallery cs-sr">
              {project.gallery.map((g, i) => (
                <MockupFrame key={g.label} kind={g.kind} label={g.label} img={g.img} onClick={() => setLightboxIndex(i)} />
              ))}
            </div>
          </div>
        )}

        {/* {project.beforeAfter && (
          <div className="cs-section">
            <div className="cs-section-num cs-sr">05 — Before &amp; After</div>
            <h2 className="cs-sr">
              The <em>shift</em> in one view
            </h2>
            <p className="cs-sr" style={{ marginBottom: 28 }}>
              Drag the handle to compare.
            </p>
            <div className="cs-sr">
              <BeforeAfter before={project.beforeAfter.before} after={project.beforeAfter.after} />
            </div>
          </div>
        )} */}

        <div className="cs-section">
          <div className="cs-section-num cs-sr">05 — Outcomes &amp; Impact</div>
          <h2 className="cs-sr">
            Results that <em>mattered</em>
          </h2>
          <ul className="cs-outcomes">
            {project.outcomes.map((o, i) => (
              <li className="cs-sr" data-n={`0${i + 1}`} key={o}>
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div className="cs-section">
          <div className="cs-section-num cs-sr">06 — Skills Applied</div>
          <div className="cs-tags cs-sr">
            {project.tags.map((t, i) => (
              <span className={`cs-tag ${i < 2 ? "accent" : ""}`} key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {nextProject && (
          <button
            type="button"
            className="cs-next cs-sr"
            onClick={() => navigate(`/project/${nextProject.id}`)}
            onMouseEnter={bindHoverGrow}
            onMouseLeave={unbindHoverGrow}
          >
            <div>
              <div className="cs-next-label">Next Project</div>
              <div className="cs-next-title">{nextProject.title}</div>
            </div>
            <ArrowRight size={24} className="cs-next-arrow" />
          </button>
        )}
      </div>

      {project.gallery && (
        <Lightbox items={project.gallery} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNav={navLightbox} />
      )}
    </div>
  );
}
