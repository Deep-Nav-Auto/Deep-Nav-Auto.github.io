import Link from "next/link";
import type { ContactPageContent } from "@/lib/types";

export function ContactContent({ page }: { page: ContactPageContent }) {
  const { profile, address } = page;

  return (
    <div className="flex flex-col gap-10">
      {page.intro && (
        <p className="font-sans text-[14px] font-light leading-[1.75] text-white/45">
          {page.intro}
        </p>
      )}

      <div>
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
          Location
        </div>
        <address className="font-sans text-[14px] font-light not-italic leading-[1.9] text-white/45">
          {address.lab}
          <br />
          {address.building}
          <br />
          {address.university}
          <br />
          {address.street}
          <br />
          {address.country}
        </address>
      </div>

      <div>
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
          Director
        </div>
        <p className="font-sans text-[14px] font-light text-white/45">
          {profile.name}
          <br />
          <a
            href={`mailto:${profile.email}`}
            className="text-white/45 transition-colors duration-150 hover:text-white"
          >
            {profile.email}
          </a>
        </p>
      </div>

      <div>
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
          Prospective Students
        </div>
        <p className="font-sans text-[14px] font-light leading-[1.75] text-white/45">
          We are always looking for motivated graduate students with strong
          backgrounds in engineering, mathematics, or computer science. Please
          include your CV, transcripts, and a brief research statement when
          reaching out about graduate positions. See{" "}
          <Link
            href={profile.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white"
          >
            information on applying to the lab
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
