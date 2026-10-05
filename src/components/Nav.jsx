import { useEffect, useState } from 'react';

export default function Nav({ onNavClick }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // nav shadow once scrolled
  useEffect(() => {
    const t = () => setScrolled((window.scrollY || document.documentElement.scrollTop) > 60);
    window.addEventListener('scroll', t, { passive: true });
    t();
    return () => window.removeEventListener('scroll', t);
  }, []);

  // mobile menu: body lock, Escape, resize, hashchange
  useEffect(() => { document.body.classList.toggle('menu-open', open); }, [open]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onResize = () => { if (innerWidth > 860) setOpen(false); };
    const onHash = () => setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  const link = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a) onNavClick(a.getAttribute('href').slice(1));
  };

  return (
    <>
      <div id="bar"></div>
      <nav className={scrolled ? 'scrolled' : undefined} onClick={link}><div className="wrap">
        <a className="logo" href="#top">P.S</a>
        <div className="links mono"><a href="#about">About</a><a href="#work">Work</a><a href="#skills">Skills</a><a href="#process">Process</a><a href="#contact">Contact</a></div>
        <a className="btn" href="#contact">Hire me</a>
        <button
          className="burger" type="button"
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mmenu"
          onClick={() => setOpen(!open)}
        ><span></span><span></span><span></span></button>
      </div></nav>
      <div id="mmenu" aria-hidden={!open} onClick={(e) => { if (e.target.closest('a')) setOpen(false); link(e); }}>
        <div className="ml"><a href="#about"><small>01</small>About</a><a href="#work"><small>02</small>Work</a><a href="#skills"><small>03</small>Skills</a><a href="#process"><small>04</small>Process</a><a href="#contact"><small>05</small>Contact</a></div>
        <div className="mf"><a href="mailto:prakashsekar.uiux@gmail.com">prakashsekar.uiux@gmail.com</a><span>Prakash Sekar · UI/UX Designer</span></div>
      </div>
    </>
  );
}
