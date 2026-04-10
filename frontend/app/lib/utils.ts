export function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function scoreColor(score: number): string {
  if (score >= 8) return "text-green-600";
  if (score >= 6) return "text-amber-500";
  return "text-red-500";
}

export function scoreBg(score: number): string {
  if (score >= 8) return "bg-green-100 text-green-700";
  if (score >= 6) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      qs.set(key, String(value));
    }
  }
  const str = qs.toString();
  return str ? `?${str}` : "";
}
