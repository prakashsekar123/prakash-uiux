import { useEffect, useRef } from 'react';
import initBlob from '../effects/initBlob.js';

export default function Hero() {
  const cv = useRef(null);
  useEffect(() => initBlob(cv.current), []);
  return (
    <header className="hero" id="top">
      <canvas id="blobc" ref={cv} aria-label="A squishy orange blob you can drag and throw"></canvas>
      <div className="copy">
        <h1><span>I Make Complex Products</span><span>Feel Simple.</span></h1>
        <p>I’m Prakash, a UI/UX Designer focused on turning complex problems into intuitive digital experiences through user research, product thinking, and thoughtful design.</p>
        <div className="cta"><a className="btn primary" href="#work">See my work</a></div>
      </div>
    </header>
  );
}
