import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, CONTACT } from "../../data/content";
import { bindHoverGrow, unbindHoverGrow } from "../../utils/cursorEffects";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({
  scrolled,
  isHome,
  activeSection,
  menuOpen,
  onToggleMenu,
  onNavigate,
  theme,
  onToggleTheme,
}) {
  return (
    <nav className={scrolled ? "nav-scrolled" : ""}>
      <Link to="/" className="nav-logo">
        Prakash<span className="dot">.</span>
      </Link>

      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={`/#${link.id}`}
              className={isHome && activeSection === link.id ? "active" : ""}
              onClick={(e) => onNavigate(e, link.id)}
              onMouseEnter={bindHoverGrow}
              onMouseLeave={unbindHoverGrow}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        {/* <ThemeToggle theme={theme} onToggle={onToggleTheme} /> */}

        <a
          href={`mailto:${CONTACT.email}`}
          className="nav-cta"
          onMouseEnter={bindHoverGrow}
          onMouseLeave={unbindHoverGrow}
        >
          Hire Me
        </a>

        <button
          type="button"
          className="nav-burger"
          onClick={onToggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onMouseEnter={bindHoverGrow}
          onMouseLeave={unbindHoverGrow}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}