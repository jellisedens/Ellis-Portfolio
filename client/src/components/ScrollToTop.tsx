import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      const timeout = setTimeout(() => {
        const delayed = document.getElementById(hash.replace("#", ""));
        if (delayed) {
          delayed.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}