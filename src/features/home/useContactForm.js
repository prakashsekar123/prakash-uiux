import { useState } from "react";
import { CONTACT } from "../../data/content";

/** The form has no backend — submitting opens the user's email client with
 *  the message pre-filled via a mailto: link. Small, honest UX for a static
 *  portfolio site with no server to receive form posts. */
export default function useContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("success"), 500);
  };

  const reset = () => {
    setStatus("idle");
    setForm({ name: "", email: "", message: "" });
  };

  return { form, status, handleChange, handleSubmit, reset };
}
