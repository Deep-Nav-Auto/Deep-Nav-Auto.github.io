"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { brandAssets } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Publications", href: "/publications" },
    { label: "Gallery", href: "/gallery" },
    { label: "Team", href: "/team" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useScrollLock(menuOpen);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="nm-navbar sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.88)] backdrop-blur-[24px]">
      <nav className="mx-auto flex h-[var(--navbar-height)] w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-16 xl:px-20">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center transition-opacity hover:opacity-90"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={brandAssets.logoFull}
            alt="Intelligent Navigation and Mapping Lab"
            width={280}
            height={56}
            className="h-8 w-auto max-w-[min(200px,52vw)] sm:h-10 md:h-11 lg:h-12"
            priority
          />
        </Link>

        <div className="hidden items-center justify-end gap-6 md:flex lg:gap-10 xl:gap-12">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nm-nav-link whitespace-nowrap font-sans text-[14px] font-normal lg:text-[15px]",
                  isActive ? "active" : "",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="nm-mobile-menu-btn flex md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "nm-mobile-nav md:hidden",
          menuOpen ? "nm-mobile-nav--open" : "",
        )}
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 pb-6 pt-2 sm:px-8">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nm-mobile-nav-link",
                  isActive ? "nm-mobile-nav-link--active" : "",
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
