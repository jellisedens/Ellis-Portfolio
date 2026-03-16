import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");

      const scrollToElement = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (scrollToElement()) return;

      // Retry with increasing delays until element is found
      const delays = [100, 300, 600, 1000];
      const timers = delays.map((delay) =>
        setTimeout(() => scrollToElement(), delay)
      );

      return () => timers.forEach(clearTimeout);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}