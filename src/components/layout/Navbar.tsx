"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, siteName } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const navItems = [...siteConfig.navItems].sort((a, b) => a.order - b.order);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--divider)] bg-[var(--bg)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-[var(--max-width)] items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-[var(--text)] hover:text-[var(--theme-color)]"
        >
          {siteName}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors",
              pathname === "/"
                ? "bg-[var(--theme-color)] text-white"
                : "text-[var(--text-muted)] hover:bg-[var(--card-bg)]",
            )}
          >
            About
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-[var(--theme-color)] text-white"
                  : "text-[var(--text-muted)] hover:bg-[var(--card-bg)]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/news"
            className={cn(
              "hidden rounded-md px-3 py-2 text-sm transition-colors sm:inline-flex",
              pathname === "/news"
                ? "bg-[var(--theme-color)] text-white"
                : "text-[var(--text-muted)] hover:bg-[var(--card-bg)]",
            )}
          >
            News
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
