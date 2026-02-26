import { siteConfig, navLinks } from "../data/portfolio";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-secondary/10 z-50">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold text-text">
          {siteConfig.name}
        </a>
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-text-muted hover:text-primary transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;