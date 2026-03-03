import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";

const navLinks = [
  { label: "Home", path: "/" },
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
                  ? "text-white font-medium"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <a  href="/#contact"
            className="bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Contact
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-white/10 bg-charcoal px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-sm ${
                location.pathname === link.path
                  ? "text-white font-medium"
                  : "text-white/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <a  href="/#contact"
            onClick={() => setIsOpen(false)}
            className="block text-sm text-primary"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}