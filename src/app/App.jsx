import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import Navbar from "../components/layout/Navbar";
import MobileMenu from "../components/layout/MobileMenu";
import PageLoader from "../components/layout/PageLoader";
import CustomCursor from "../components/layout/CustomCursor";
import ScrollProgress from "../components/layout/ScrollProgress";
import BackToTop from "../components/layout/BackToTop";
import useTheme from "../hooks/useTheme";
import useScrollChrome from "../hooks/useScrollChrome";

// Case study pages are not needed for the very first paint of the home
// route, so they're split into their own chunk and fetched on demand.
const ProjectDetailPage = lazy(() => import("../features/project-detail/ProjectDetailPage"));

function RouteFallback() {
  return <div style={{ minHeight: "100vh" }} aria-hidden="true" />;
}

function Shell({ children }) {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isHome = location.pathname === "/";
  const isProjectDetail = location.pathname.startsWith("/project/");
  const { navHidden, scrolled, progress, showBackToTop, activeSection } = useScrollChrome({ trackSections: isHome });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Reset scroll position on route change so case-study pages start at top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const goToSection = useCallback(
    (e, id) => {
      setMenuOpen(false);
      if (location.pathname !== "/") {
        e.preventDefault();
        navigate(`/#${id}`);
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <>
      <div className="grain-grid" aria-hidden="true" />
      <PageLoader hidden={!loading} />
      <CustomCursor />
      <ScrollProgress progress={progress} />

      {!isProjectDetail && (
        <Navbar
          scrolled={scrolled}
          isHome={isHome}
          activeSection={activeSection}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((v) => !v)}
          onNavigate={goToSection}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      {!isProjectDetail && (
        <MobileMenu open={menuOpen} onNavigate={goToSection} onClose={() => setMenuOpen(false)} />
      )}

      {children}

      <BackToTop show={showBackToTop} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/project/:id"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ProjectDetailPage />
              </Suspense>
            }
          />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}