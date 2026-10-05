import { Fragment, useEffect, useRef, useState } from 'react';
import { P, RICH } from '../data/projects.js';

function Sec({ label, children }) {
  return (
    <div className="d-sec rv">
      <span className="mono">{label}</span>
      <div className="d-body">{children}</div>
    </div>
  );
}

const Paras = ({ items }) => items.map((x, i) => <p key={i}>{x}</p>);

const Cards = ({ items, two }) => (
  <div className={'d-cards' + (two ? ' two' : '')}>
    {items.map((x, i) => (
      <div key={i}>
        <h4>{x[0]}</h4>
        <p>{x[1]}</p>
        {two && (
          <ul className="d-mini">{x[2].map((b, j) => <li key={j}>{b}</li>)}</ul>
        )}
      </div>
    ))}
  </div>
);

const List = ({ items }) => (
  <ul className="d-list">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
);

const FeatGrid = ({ items }) => (
  <div className="d-feat">
    {items.map((x, i) => (
      <div key={i}><h5>{x[0]}</h5><p>{x[1]}</p></div>
    ))}
  </div>
);

function MetaBar({ p, R }) {
  const m = R && R.meta ? R.meta : [['Role', 'UI/UX Designer'], ['Type', p.t], ['Deliverables', 'Research · UX · UI'], ['Tools', 'Figma · Prototyping']];
  return (
    <div className="d-meta rv">
      {m.map((x, i) => <div key={i}><span className="mono">{x[0]}</span><b>{x[1]}</b></div>)}
    </div>
  );
}

function Panel({ r, on }) {
  return (
    <div className={'d-panel' + (on ? ' on' : '')} role="tabpanel">
      <h3>{r.t || r.n + ' Dashboard'}</h3>
      <p className="purpose">{r.purpose}</p>
      <div className="d-feat">
        {r.feat.map((x, i) =>
          typeof x === 'string' ? (
            <div key={i}><h5>{x}</h5></div>
          ) : (
            <div key={i}>
              <h5>{x[0]}</h5>
              {x[1] ? <p>{x[1]}</p> : null}
              {x[2] ? <ul className="d-mini">{x[2].map((b, j) => <li key={j}>{b}</li>)}</ul> : null}
              {x[3] ? <p className="uxl"><b>UX focus</b>{x[3]}</p> : null}
            </div>
          )
        )}
      </div>
      {r.journey ? (
        <div className="d-journey">
          <span className="mono">{r.jl || 'User journey'}</span>
          <ol className="d-steps">
            {r.journey.map((j, i) => <li key={i}><b>{j[0]}</b><span>{j[1]}</span></li>)}
          </ol>
        </div>
      ) : null}
      {r.ux ? <div className="d-ux"><span className="mono">UX focus</span><p>{r.ux}</p></div> : null}
    </div>
  );
}

function RichBody({ p, R }) {
  const [tab, setTab] = useState(0);
  return (
    <>
      <Sec label="Overview"><Paras items={R.overview} /></Sec>
      <Sec label="The problem"><Paras items={R.problem} /></Sec>
      <Sec label="Key challenges"><Cards items={R.challenges} /></Sec>
      <Sec label="Business goals"><List items={R.goals} /></Sec>
      <Sec label="The solution"><Paras items={R.solution.split('</p><p>')} /></Sec>
      <Sec label={R.tabsLabel || 'Five dashboards'}>
        <div className="d-tabs" role="tablist">
          {R.roles.map((r, k) => (
            <button
              key={k}
              className={'d-tab' + (k === tab ? ' on' : '')}
              role="tab"
              aria-selected={k === tab}
              onClick={() => setTab(k)}
            >{'0' + (k + 1) + ' ' + r.n}</button>
          ))}
        </div>
        {R.roles.map((r, k) => <Panel key={k} r={r} on={k === tab} />)}
      </Sec>
      {R.extra ? <Sec label={R.extraLabel || 'Key experiences'}><Cards items={R.extra} two /></Sec> : null}
      <Sec label={R.designLabel || 'Design solutions'}><Cards items={R.design} /></Sec>
      {R.impact ? <Sec label={R.impactLabel || 'Business impact'}><List items={R.impact} /></Sec> : null}
      {R.outcome ? <Sec label={R.outcomeLabel || 'Project outcome'}><Paras items={R.outcome} /></Sec> : null}
      {R.screens ? (
        <Sec label={R.screensLabel || 'UI screens'}>
          {R.screens.map((x, i) => (
            <div className="d-flow d-scr" key={i}>
              <span className="mono">{x[0]}</span>
              <img src={x[1]} alt={x[0]} loading="lazy" />
            </div>
          ))}
        </Sec>
      ) : null}
      {R.details ? <Sec label="Project details"><FeatGrid items={R.details} /></Sec> : null}
      {R.skills ? <Sec label="Tools & skills"><FeatGrid items={R.skills} /></Sec> : null}
    </>
  );
}

export default function ProjectDetail({ slug, onBack, onOpen, observe }) {
  const root = useRef(null);
  const i = P.findIndex((p) => p.s === slug);

  // scroll-reveal for the freshly rendered detail sections
  useEffect(() => {
    if (root.current) root.current.querySelectorAll('.rv').forEach((e) => observe(e));
  }, [slug, observe]);

  if (i < 0) return null;
  const p = P[i];
  const nx = P[(i + 1) % P.length];
  const R = RICH[p.s];

  return (
    <div className="wrap" ref={root}>
      <button className="back mono" onClick={onBack}>← All projects</button>
      <div className="mono d-num">{'0' + (i + 1) + ' / 0' + P.length}</div>
      <h2 className="d-title">{p.n}</h2>
      <p className="d-lead">{p.lead}</p>
      <span className="chip d-tag">{p.t}</span>
      <MetaBar p={p} R={R} />
      {R ? <RichBody key={slug} p={p} R={R} /> : null}
      <a className="d-next" onClick={() => onOpen(nx.s)}><span className="mono">Next project →</span><h3>{nx.n}</h3></a>
    </div>
  );
}
