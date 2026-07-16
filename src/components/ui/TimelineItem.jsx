export default function TimelineItem({ item, side }) {
  return (
    <div className={`tl-item tl-${side}`}>
      <div className="tl-dot" />
      <div className="tl-card">
        <span className="tl-period">{item.period}</span>
        <h3 className="tl-company">{item.company}</h3>
        <div className="tl-meta">
          {item.role} · {item.location}
        </div>
        <ul className="tl-points">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
