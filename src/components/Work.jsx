import { P } from '../data/projects.js';

export default function Work({ onOpen }) {
  return (
    <section className="work" id="work"><div className="wrap">
      <div className="head">
        <div><div className="eyebrow mono">Selected work</div><h2>Real Problems.<br />Thoughtfully Designed.</h2></div>
      </div>
      {P.map((p, i) => (
        <div
          className="proj"
          key={p.s}
          role="link"
          tabIndex={0}
          onClick={() => onOpen(p.s)}
          onKeyDown={(ev) => { if (ev.key === 'Enter') onOpen(p.s); }}
        >
          <span className="mono">{'0' + (i + 1)}</span>
          <div><h3>{p.n}</h3><div className="chips"><span className="chip">{p.t}</span></div></div>
        </div>
      ))}
    </div></section>
  );
}
