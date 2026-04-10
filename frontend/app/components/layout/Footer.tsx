import { Link } from "react-router";
import { GiTennisBall } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border-soft mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-ink font-bold text-lg mb-3">
              <GiTennisBall className="text-brand-gold text-xl" />
              tennismp
            </Link>
            <p className="text-ink-muted text-sm leading-relaxed">
              Independent tennis gear reviews, tips, and tools to help you find
              the perfect equipment for your game.
            </p>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-ink font-semibold mb-3 text-sm uppercase tracking-wider">
              Reviews
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/racquets", label: "Racquets" },
                { to: "/strings", label: "Strings" },
                { to: "/other", label: "Other Gear" },
                { to: "/blog", label: "Blog" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-ink-muted hover:text-ink text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-ink font-semibold mb-3 text-sm uppercase tracking-wider">
              Tools
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/tools/racquet-picker", label: "Racquet Picker" },
                { to: "/tools/racquet-picker/guided", label: "Guided Picker" },
                { to: "/tools/racquet-picker/filter", label: "Filter Racquets" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-ink-muted hover:text-ink text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-soft text-center text-ink-muted text-sm">
          © {new Date().getFullYear()} tennismp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
