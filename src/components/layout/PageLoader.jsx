export default function PageLoader({ hidden }) {
  return (
    <div className={`loader ${hidden ? "hidden" : ""}`} role="status" aria-live="polite">
      <div className="loader-mark">
        PRAKASH&nbsp;S
        <div className="loader-bar" />
      </div>
    </div>
  );
}
