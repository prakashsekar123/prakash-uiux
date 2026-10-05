import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { P } from './data/projects.js';
import initPage from './effects/initPage.js';
import Loader from './components/Loader.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Work from './components/Work.jsx';
import Skills from './components/Skills.jsx';
import Process from './components/Process.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';

const TT = document.title;

export default function App() {
  const [slug, setSlug] = useState(null);
  const slugRef = useRef(null);      // synchronous mirror of `slug`
  const saved = useRef(0);           // scroll position to return to
  const pendingHide = useRef(null);  // section id to scroll to when leaving a project
  const ioRef = useRef(null);
  const first = useRef(true);

  const observe = useCallback((e) => { if (ioRef.current) ioRef.current.observe(e); }, []);

  // page-wide behaviours (reveal, progress bar, magnetic buttons, active link, ...)
  useEffect(() => {
    const page = initPage();
    ioRef.current = page.io;
    return page.cleanup;
  }, []);

  const show = useCallback((s) => {
    if (P.findIndex((p) => p.s === s) < 0) return;
    if (!slugRef.current) saved.current = window.scrollY;
    slugRef.current = s;
    setSlug(s);
  }, []);

  const hide = useCallback((id) => {
    pendingHide.current = id || null;
    slugRef.current = null;
    setSlug(null);
  }, []);

  // apply detail-mode side effects after React has rendered
  useLayoutEffect(() => {
    const h = document.documentElement;
    if (slug) {
      const p = P.find((x) => x.s === slug);
      document.body.classList.add('detail');
      document.title = p.n + ' — Prakash Sekar';
      h.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); h.style.scrollBehavior = '';
    } else if (!first.current) {
      document.body.classList.remove('detail');
      document.title = TT;
      const id = pendingHide.current;
      const el = id && document.getElementById(id);
      h.style.scrollBehavior = 'auto';
      if (el) el.scrollIntoView(); else window.scrollTo(0, saved.current);
      h.style.scrollBehavior = '';
    }
    first.current = false;
  }, [slug]);

  const go = useCallback((s) => {
    try { window.location.hash = '#/work/' + s; } catch (e) { /* ignore */ }
    show(s);
  }, [show]);

  const back = useCallback(() => {
    try { window.location.hash = '#work'; } catch (e) { /* ignore */ }
    hide('work');
  }, [hide]);

  // hash routing
  useEffect(() => {
    const route = () => {
      const h = window.location.hash;
      if (h.indexOf('#/work/') === 0) show(h.slice(7));
      else if (slugRef.current) hide(h.slice(1));
    };
    window.addEventListener('hashchange', route);
    route();
    return () => window.removeEventListener('hashchange', route);
  }, [show, hide]);

  // in-page nav links while a project is open
  const onNavClick = useCallback((id) => {
    if (slugRef.current) setTimeout(() => hide(id), 0);
  }, [hide]);

  return (
    <>
      <Loader />
      <Nav onNavClick={onNavClick} />
      <Hero />
      <Marquee />
      <About />
      <Work onOpen={go} />
      <Skills />
      <Process />
      <Contact />
      <main id="detail" aria-live="polite">
        {slug ? <ProjectDetail key={slug} slug={slug} onBack={back} onOpen={go} observe={observe} /> : null}
      </main>
      <Footer />
      <button id="totop" aria-label="Back to top"><span>↑</span></button>
    </>
  );
}
