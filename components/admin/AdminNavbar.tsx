"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

  const navItem = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`relative px-1 transition-colors ${
          active
            ? "text-blue-600 font-semibold"
            : "text-gray-600 hover:text-blue-600"
        }`}
      >
        {label}
        {active && (
          <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600 rounded" />
        )}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Project<span className="text-blue-600">Pulse</span>
        </h1>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm">
          {navItem("/dashboard/admin", "Dashboard")}
          {navItem("/dashboard/admin/projects", "Projects")}
          {navItem("/dashboard/admin/risks", "Risks")}

          <Link
            href="/login"
            className="ml-6 rounded-md border border-red-200 px-4 py-1.5 text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
