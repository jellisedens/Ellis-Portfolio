interface Props {
  exiting: boolean;
}

export default function LoadingScreen({ exiting }: Props) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-charcoal flex flex-col items-center justify-center gap-6 pb-24 transition-opacity duration-1000 ease-in-out ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <p
        className={`text-text-inverse text-4xl md:text-5xl font-bold tracking-tight transition-all duration-700 ease-in-out ${
          exiting ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        Edens Solutions
      </p>
      <div
        className={`flex gap-2.5 transition-all duration-700 ease-in-out delay-100 ${
          exiting ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-text-inverse/40 animate-[pulse_1.2s_ease-in-out_infinite]" />
        <span className="w-2.5 h-2.5 rounded-full bg-text-inverse/40 animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
        <span className="w-2.5 h-2.5 rounded-full bg-text-inverse/40 animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
      </div>
    </div>
  );
}