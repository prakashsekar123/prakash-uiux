import { Mail, Phone, Check } from "lucide-react";
import { CONTACT } from "../../../data/content";
import { bindHoverGrow, unbindHoverGrow } from "../../../utils/cursorEffects";
import Reveal from "../../../components/ui/Reveal";
import useContactForm from "../useContactForm";

export default function ContactSection() {
  const { form, status, handleChange, handleSubmit, reset } = useContactForm();

  return (
    <section className="contact" id="contact">
      <div className="section-label">05 — Get In Touch</div>
      <div className="contact-inner">
        <Reveal className="contact-left">
          <h2 className="section-title">
            Let&apos;s build
            <br />
            something <em>great.</em>
          </h2>
          <p>
            Open to full-time roles, freelance projects, and design collaborations. Based in Coimbatore, available
            globally.
          </p>
          <div className="contact-links">
            <a
              href={`mailto:${CONTACT.email}`}
              className="contact-item"
              onMouseEnter={bindHoverGrow}
              onMouseLeave={unbindHoverGrow}
            >
              <div className="contact-icon">
                <Mail size={17} />
              </div>
              <div>
                <span className="contact-label">Email</span>
                <span className="contact-value">{CONTACT.email}</span>
              </div>
            </a>
            <a
              href={CONTACT.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="contact-item"
              onMouseEnter={bindHoverGrow}
              onMouseLeave={unbindHoverGrow}
            >
              <div className="contact-icon">
                <Mail size={17} />
              </div>
              <div>
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">{CONTACT.linkedin.label}</span>
              </div>
            </a>
            <a
              href={CONTACT.behance.href}
              target="_blank"
              rel="noreferrer"
              className="contact-item"
              onMouseEnter={bindHoverGrow}
              onMouseLeave={unbindHoverGrow}
            >
              <div className="contact-icon">Bē</div>
              <div>
                <span className="contact-label">Portfolio</span>
                <span className="contact-value">{CONTACT.behance.label}</span>
              </div>
            </a>
            <a
              href={CONTACT.phoneHref}
              className="contact-item"
              onMouseEnter={bindHoverGrow}
              onMouseLeave={unbindHoverGrow}
            >
              <div className="contact-icon">
                <Phone size={16} />
              </div>
              <div>
                <span className="contact-label">Phone</span>
                <span className="contact-value">{CONTACT.phone}</span>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal className="contact-right" delay={0.15}>
          {status === "success" ? (
            <div className="contact-form form-success-wrap">
              <div className="form-success show">
                <div className="check">
                  <Check size={22} />
                </div>
                <div style={{ fontWeight: 600 }}>Message ready — check your email app</div>
                <button type="button" className="btn-ghost" style={{ marginTop: 20 }} onClick={reset}>
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  required
                  value={form.name}
                  onChange={handleChange}
                  onMouseEnter={bindHoverGrow}
                  onMouseLeave={unbindHoverGrow}
                />
                <label>Your Name</label>
              </div>
              <div className="field">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  required
                  value={form.email}
                  onChange={handleChange}
                  onMouseEnter={bindHoverGrow}
                  onMouseLeave={unbindHoverGrow}
                />
                <label>Email Address</label>
              </div>
              <div className="field">
                <textarea
                  name="message"
                  placeholder=" "
                  required
                  value={form.message}
                  onChange={handleChange}
                  onMouseEnter={bindHoverGrow}
                  onMouseLeave={unbindHoverGrow}
                />
                <label>Tell me about your project</label>
              </div>
              <button
                type="submit"
                className={`form-submit ${status === "loading" ? "loading" : ""}`}
                onMouseEnter={bindHoverGrow}
                onMouseLeave={unbindHoverGrow}
              >
                <span className="spinner" />
                <span className="submit-label">Send Message</span>
              </button>
              <p className="form-note">Opens your email client with this message pre-filled.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
