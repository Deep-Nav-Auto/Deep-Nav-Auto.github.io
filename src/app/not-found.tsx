import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-serif text-4xl font-bold">404</h1>
      <p className="mt-4 text-[var(--text-muted)]">Page not found.</p>
      <Link
        href="/"
        className="mt-6 inline-block text-[var(--theme-color)] hover:underline"
      >
        Return home
      </Link>
    </div>
  );
}
