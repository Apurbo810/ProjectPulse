"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function ClientNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };
  
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-xl font-bold">ProjectPulse</h1>

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/client"
          className="font-medium text-gray-700 hover:text-black"
        >
          Dashboard
        </Link>

        <button
            onClick={logout}
            className="ml-6 rounded-md border border-red-200 px-4 py-1.5 text-sm text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>

      </div>
    </nav>
  );
}
