import Reveal from "../../../components/ui/Reveal";

export default function PhilosophySection() {
  return (
    <section className="philosophy">
      <div className="philosophy-glow" aria-hidden="true" />
      <Reveal as="p" className="philosophy-text">
        Good design is invisible. <em>Great design is unforgettable.</em> I build products people don&apos;t just
        use — they remember.
      </Reveal>
      <Reveal as="span" className="philosophy-attr" delay={0.15}>
        — Prakash S
      </Reveal>
    </section>
  );
}
