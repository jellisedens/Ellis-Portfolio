import { siteConfig, socialLinks } from "../data/portfolio";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-secondary/10 px-6 py-8">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="text-sm text-text-muted">
          &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
  {socialLinks.map((link) => (
    <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-primary transition-colors" aria-label={link.label}>
      {link.platform}
    </a>
  ))}
</div>
      </div>
    </footer>
  );
}

export default Footer;