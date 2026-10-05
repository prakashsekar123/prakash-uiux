import { useEffect, useRef, useState } from 'react';
import initLoader from '../effects/initLoader.js';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Loader() {
  const ref = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => initLoader(ref.current, () => setGone(true)), []);

  if (gone) return null;
  return (
    <div id="loader" role="status" aria-label="Loading" ref={ref}>
      <canvas></canvas>
      <div className="cap">Prakash Sekar · UI/UX Designer</div>
      <div className="num" aria-hidden="true">
        <span className="col h"><span className="roll">{DIGITS.map((d) => <i key={d}>{d}</i>)}</span></span>
        <span className="col"><span className="roll">{DIGITS.map((d) => <i key={d}>{d}</i>)}</span></span>
        <span className="col"><span className="roll">{DIGITS.map((d) => <i key={d}>{d}</i>)}</span></span>
      </div>
    </div>
  );
}
