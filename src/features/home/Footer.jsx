import { Mail } from "lucide-react";
import { CONTACT } from "../../data/content";
import { bindHoverGrow, unbindHoverGrow } from "../../utils/cursorEffects";

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        Prakash<span className="dot">.</span>
      </div>
      <div className="footer-social">
        <a
          href={CONTACT.linkedin.href}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          onMouseEnter={bindHoverGrow}
          onMouseLeave={unbindHoverGrow}
        >
          <Mail size={16} />
        </a>
        <a
          href={CONTACT.behance.href}
          target="_blank"
          rel="noreferrer"
          aria-label="Behance"
          onMouseEnter={bindHoverGrow}
          onMouseLeave={unbindHoverGrow}
        >
          Bē
        </a>
        <a href={`mailto:${CONTACT.email}`} aria-label="Email" onMouseEnter={bindHoverGrow} onMouseLeave={unbindHoverGrow}>
          <Mail size={16} />
        </a>
      </div>
      <div className="footer-copy">© 2026 Prakash S — UI/UX Designer. All rights reserved.</div>
    </footer>
  );
}
