"use client";

import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/lib/site-config";

export function Footer() {
  const links = [
    { label: "Publications", href: "/publications" },
    { label: "Gallery", href: "/gallery" },
    { label: "Team", href: "/team" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="w-full border-t border-[rgba(255,255,255,0.06)] bg-black px-5 py-10 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 sm:gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={brandAssets.logoMark}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 opacity-80"
          />
          <div className="min-w-0">
            <div className="font-syne text-[13px] font-extrabold text-white/60 mb-1.5 leading-snug">
              Intelligent Navigation and Mapping Lab
            </div>
            <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
              © 2025 INML · University of Calgary
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] text-white/20 uppercase tracking-widest transition-colors duration-150 hover:text-white/55"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
