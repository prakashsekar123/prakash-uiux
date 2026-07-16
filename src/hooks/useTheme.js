import { useEffect } from "react";

/** App is dark-mode only. This just ensures <html data-theme="dark"> is set,
 *  in case index.html's inline script or markup ever falls out of sync. */
export default function useTheme() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return { theme: "dark", toggleTheme: () => {} };
}