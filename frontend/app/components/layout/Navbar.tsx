import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { GiTennisBall } from "react-icons/gi";

const navLinks = [
  { to: "/racquets", label: "Racquets" },
  { to: "/strings", label: "Strings" },
  { to: "/other", label: "Gear" },
  { to: "/blog", label: "Blog" },
  { to: "/tools/racquet-picker", label: "Racquet Picker" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border-soft shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-ink font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            <GiTennisBall className="text-brand-gold text-2xl" />
            <span>tennismp</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-indigo/10 text-brand-indigo"
                      : "text-ink-muted hover:text-ink hover:bg-surface-alt"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-ink-muted p-3 rounded-lg hover:bg-surface-alt transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border-soft">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-indigo/10 text-brand-indigo"
                      : "text-ink-muted hover:text-ink hover:bg-surface-alt"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
