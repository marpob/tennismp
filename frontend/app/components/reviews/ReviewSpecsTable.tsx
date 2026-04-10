interface SpecRow {
  label: string;
  value: string | number | undefined | null;
}

interface Props {
  specs: SpecRow[];
}

export default function ReviewSpecsTable({ specs }: Props) {
  const visible = specs.filter((s) => s.value !== undefined && s.value !== null && s.value !== "");

  if (visible.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-border-soft">
      <table className="w-full text-sm">
        <tbody>
          {visible.map((spec, i) => (
            <tr
              key={spec.label}
              className={i % 2 === 0 ? "bg-white" : "bg-surface-alt"}
            >
              <td className="px-4 py-3 font-medium text-ink-muted w-1/2 whitespace-nowrap">
                {spec.label}
              </td>
              <td className="px-4 py-3 text-ink font-semibold">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
