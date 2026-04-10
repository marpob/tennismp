import { FiCheck, FiX } from "react-icons/fi";

interface Props {
  pros?: string[];
  cons?: string[];
}

export default function ProsConsList({ pros, cons }: Props) {
  if (!pros?.length && !cons?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {pros && pros.length > 0 && (
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-1.5">
            <FiCheck className="text-green-600" />
            Pros
          </h4>
          <ul className="space-y-2">
            {pros.map((pro, i) => (
              <li key={i} className="flex gap-2 text-sm text-green-800">
                <FiCheck className="text-green-500 mt-0.5 shrink-0" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cons && cons.length > 0 && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-1.5">
            <FiX className="text-red-600" />
            Cons
          </h4>
          <ul className="space-y-2">
            {cons.map((con, i) => (
              <li key={i} className="flex gap-2 text-sm text-red-800">
                <FiX className="text-red-400 mt-0.5 shrink-0" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
