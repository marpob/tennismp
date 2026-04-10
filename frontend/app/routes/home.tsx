import { Link } from "react-router";
import type { Route } from "./+types/home";
import { GiTennisBall, GiTennisRacket } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "tennismp — Independent Tennis Gear Reviews" },
    {
      name: "description",
      content:
        "In-depth reviews of tennis racquets, strings, balls, and gear. Plus tools to help you find the perfect racquet for your game.",
    },
  ];
}

const categories = [
  {
    href: "/racquets",
    label: "Racquets",
    description: "Detailed racquet reviews with specs, scores, and comparisons.",
    color: "bg-brand-indigo",
  },
  {
    href: "/strings",
    label: "Strings",
    description: "Find the right string — poly, multis, natural gut and more.",
    color: "bg-brand-magenta",
  },
  {
    href: "/other",
    label: "Gear",
    description: "Books, balls, stringing machines, dampeners and more.",
    color: "bg-brand-azure",
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Tips, technique, gear guides, and tennis news.",
    color: "bg-brand-indigo-light",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-surface py-12 sm:py-20 lg:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <GiTennisBall className="text-brand-gold text-5xl sm:text-6xl" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-ink">
            Honest Tennis Gear Reviews
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-ink-muted mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            In-depth reviews of racquets, strings, and equipment — written by a
            passionate tennis player to help you make the right choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/tools/racquet-picker"
              className="inline-flex items-center justify-center gap-2 bg-brand-indigo text-white font-semibold px-6 sm:px-8 py-3 rounded-xl hover:bg-brand-indigo-dark transition-colors"
            >
              <GiTennisRacket />
              Find Your Racquet
            </Link>
            <Link
              to="/racquets"
              className="inline-flex items-center justify-center gap-2 bg-white border border-border-soft text-ink font-semibold px-6 sm:px-8 py-3 rounded-xl hover:border-brand-indigo/40 transition-colors"
            >
              Browse Reviews
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-2">Explore Reviews</h2>
        <p className="text-ink-muted mb-8 sm:mb-10">
          Honest, independent reviews across all tennis equipment categories.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map(({ href, label, description, color }) => (
            <Link
              key={href}
              to={href}
              className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className={`${color} p-4 sm:p-6 text-white`}>
                <h3 className="text-base sm:text-xl font-bold mb-1">{label}</h3>
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed hidden sm:block">
                  {description}
                </p>
                <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs sm:text-sm font-medium">
                  View all{" "}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Racquet Picker CTA */}
      <section className="bg-surface-alt border-y border-border-soft py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <GiTennisRacket className="text-brand-indigo text-4xl sm:text-5xl mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-3 sm:mb-4">
            Not Sure Which Racquet to Buy?
          </h2>
          <p className="text-ink-muted text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
            Use our Racquet Picker tool — answer 3 quick questions or use
            advanced filters to find the perfect frame for your game.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/tools/racquet-picker/guided"
              className="inline-flex items-center justify-center gap-2 bg-brand-indigo text-white font-semibold px-6 sm:px-8 py-3 rounded-xl hover:bg-brand-indigo-dark transition-colors"
            >
              Guided Picker — 3 Questions
              <FiArrowRight />
            </Link>
            <Link
              to="/tools/racquet-picker/filter"
              className="inline-flex items-center justify-center gap-2 bg-white border border-border-soft text-ink font-semibold px-6 sm:px-8 py-3 rounded-xl hover:border-brand-indigo/40 transition-colors"
            >
              Filter by Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
