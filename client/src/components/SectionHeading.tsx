interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-text">{title}</h2>
      {subtitle && <p className="mt-2 text-text-muted">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;