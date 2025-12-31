import Link from "next/link";

export default function Test() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-500 text-white p-8 text-xl space-y-4">
      <p>Hello world</p>

      <Link
        href="/login"
        className="rounded-md bg-white px-4 py-2 text-red-600 font-medium hover:bg-gray-100"
      >
        Go to Login
      </Link>
    </div>
  );
}
