/* The custom cursor is a single fixed singleton (see CustomCursor.jsx), so
   growing it on hover doesn't need per-element refs — every interactive
   element just calls these two handlers on mouse enter/leave. */
export const bindHoverGrow = () => {
  document.querySelector(".cursor")?.classList.add("hover");
  document.querySelector(".cursor-ring")?.classList.add("hover");
};

export const unbindHoverGrow = () => {
  document.querySelector(".cursor")?.classList.remove("hover");
  document.querySelector(".cursor-ring")?.classList.remove("hover");
};
