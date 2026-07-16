import { SKILL_GROUPS } from "../../../data/content";
import { tiltHandler, resetTilt } from "../../../utils/tiltEffect";
import Reveal from "../../../components/ui/Reveal";

export default function SkillsSection() {
  return (
    <section className="skills" id="skills">
      <div className="section-label">03 — Capabilities</div>
      <Reveal as="h2" className="section-title">
        A full-stack <em>design</em> toolkit.
      </Reveal>

      <div className="skills-layout">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal
            as="div"
            className="skill-group"
            key={group.title}
            delay={(i % 5) * 0.06}
            onMouseMove={tiltHandler}
            onMouseLeave={resetTilt}
          >
            <div className="skill-group-title">{group.title}</div>
            <ul className="skill-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
