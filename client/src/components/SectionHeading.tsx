interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold tracking-tight text-text">{title}</h2>
      {subtitle && <p className="mt-3 text-text-muted max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}