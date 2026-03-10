import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";

const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Resume", path: "/resume" },
  { label: "Projects", path: "/projects" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { settings } = useData();

  return (
    <nav className="sticky top-0 z-40 bg-charcoal">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-lg font-semibold text-text-inverse tracking-tight">
          {settings.siteName}
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors ${
                location.pathname === link.path
                  ? "text-text-inverse font-medium"
                  : "text-text-inverse/60 hover:text-text-inverse"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <a
            href="/#contact"
            className="text-sm transition-colors text-text-inverse/60 hover:text-text-inverse"
          >
            Contact
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-text-inverse"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-text-inverse/10 bg-charcoal px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-sm ${
                location.pathname === link.path
                  ? "text-text-inverse font-medium"
                  : "text-text-inverse/60"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <a
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="block text-sm text-text-inverse/60"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}