/** Subtle perspective tilt + a CSS custom-property spotlight that follows
 *  the cursor, applied directly via style mutation for 60fps feel without
 *  triggering React re-renders on every mousemove. */
export const tiltHandler = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const rotX = (py - 0.5) * -6;
  const rotY = (px - 0.5) * 6;
  card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  card.style.setProperty("--mx", `${px * 100}%`);
  card.style.setProperty("--my", `${py * 100}%`);
};

export const resetTilt = (e) => {
  e.currentTarget.style.transform = "";
};
