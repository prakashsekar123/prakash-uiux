import { NAV_LINKS, CONTACT } from "../../data/content";

export default function MobileMenu({ open, onNavigate, onClose }) {
  return (
    <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
      {NAV_LINKS.map((link) => (
        <a key={link.id} href={`/#${link.id}`} onClick={(e) => onNavigate(e, link.id)}>
          {link.label}
        </a>
      ))}
      <a href={`mailto:${CONTACT.email}`} className="nav-cta" onClick={onClose}>
        Hire Me
      </a>
    </div>
  );
}
