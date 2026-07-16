import { useEffect, useState } from "react";

/** Types then deletes each word in `words`, cycling forever. Returns the
 *  currently-visible substring. Pure setTimeout state machine — no
 *  animation library needed for this one. */
export default function useTypewriter(words, { typeMs = 65, deleteMs = 35, holdMs = 1600, startDelay = 1000 } = {}) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!words?.length) return undefined;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = words[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timer = setTimeout(tick, holdMs);
          return;
        }
      } else {
        charIndex -= 1;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timer = setTimeout(tick, deleting ? deleteMs : typeMs);
    };

    const start = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [words, typeMs, deleteMs, holdMs, startDelay]);

  return text;
}
