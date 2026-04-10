interface Props {
  label: string;
  variant?: "indigo" | "magenta" | "azure" | "neutral";
}

const variants = {
  indigo: "bg-brand-indigo/10 text-brand-indigo",
  magenta: "bg-brand-magenta/10 text-brand-magenta",
  azure: "bg-brand-azure/10 text-brand-azure",
  neutral: "bg-surface-alt text-ink-muted",
};

export default function TagPill({ label, variant = "neutral" }: Props) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
