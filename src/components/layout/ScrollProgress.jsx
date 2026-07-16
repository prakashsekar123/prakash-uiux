export default function ScrollProgress({ progress }) {
  return <div className="progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />;
}
