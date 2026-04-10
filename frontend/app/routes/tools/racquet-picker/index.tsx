import { Link } from "react-router";
import type { Route } from "./+types/index";
import { FiArrowRight } from "react-icons/fi";
import { GiTennisRacket } from "react-icons/gi";
import { BsSliders } from "react-icons/bs";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Racquet Picker — tennismp" },
    { name: "description", content: "Find the perfect tennis racquet with our guided picker or advanced filter tool." },
  ];
}

export default function RacquetPickerLanding() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <GiTennisRacket className="text-brand-indigo text-6xl mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4">
          Find Your Perfect Racquet
        </h1>
        <p className="text-ink-muted text-lg max-w-xl mx-auto leading-relaxed">
          Not sure which racquet to choose? Use our guided wizard to get a
          personalised recommendation, or filter by specific specs.
        </p>
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Guided */}
        <Link
          to="/tools/racquet-picker/guided"
          className="group block bg-white rounded-2xl border border-border-soft shadow-sm hover:shadow-lg hover:border-brand-indigo/30 transition-all p-8"
        >
          <div className="w-12 h-12 bg-brand-indigo/10 rounded-xl flex items-center justify-center mb-5">
            <GiTennisRacket className="text-brand-indigo text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Guided Picker</h2>
          <p className="text-ink-muted text-sm leading-relaxed mb-6">
            Answer 3 quick questions about your age, playing style, and what you
            want from a racquet. We'll recommend the top 5 frames for you.
          </p>
          <div className="flex items-center gap-2 text-brand-indigo font-semibold text-sm">
            Start — 3 questions
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Filter */}
        <Link
          to="/tools/racquet-picker/filter"
          className="group block bg-white rounded-2xl border border-border-soft shadow-sm hover:shadow-lg hover:border-brand-magenta/30 transition-all p-8"
        >
          <div className="w-12 h-12 bg-brand-magenta/10 rounded-xl flex items-center justify-center mb-5">
            <BsSliders className="text-brand-magenta text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Filter by Specs</h2>
          <p className="text-ink-muted text-sm leading-relaxed mb-6">
            Know what you're looking for? Filter by brand, weight, head size,
            balance, stiffness, string pattern, swing speed, and more.
          </p>
          <div className="flex items-center gap-2 text-brand-magenta font-semibold text-sm">
            Browse all specs
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
