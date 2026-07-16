import { EXPERIENCE } from "../../../data/content";
import Reveal from "../../../components/ui/Reveal";
import Timeline from "../../../components/ui/Timeline";

export default function ExperienceSection() {
  return (
    <section className="experience" id="experience">
      <div className="section-label">04 — Journey</div>
      <Reveal as="h2" className="section-title">
        Where I&apos;ve <em>built</em> things.
      </Reveal>
      <Timeline items={EXPERIENCE} />
    </section>
  );
}
