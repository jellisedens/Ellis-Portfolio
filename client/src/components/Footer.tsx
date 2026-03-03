import { useData } from "../context/DataContext";

export default function Footer() {
  const { settings } = useData();

  return (
    <footer className="bg-charcoal border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} {settings.siteName}
        </p>
        <div className="flex gap-6">
          {settings.githubUrl && (
            <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">GitHub</a>
          )}
          {settings.linkedinUrl && (
            <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">LinkedIn</a>
          )}
        </div>
      </div>
    </footer>
  );
}