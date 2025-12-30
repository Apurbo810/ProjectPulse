"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ClientNavbar() {
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

        <form action="/api/auth/logout" method="POST">
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </nav>
  );
}
