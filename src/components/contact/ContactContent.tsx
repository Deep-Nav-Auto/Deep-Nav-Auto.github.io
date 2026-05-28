import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, GraduationCap, ExternalLink } from "lucide-react";
import type { ContactPageContent } from "@/lib/types";
import { normalizeAssetPath } from "@/lib/utils";

export function ContactContent({ page }: { page: ContactPageContent }) {
  const { profile, address } = page;
  const imageSrc = normalizeAssetPath(profile.image);

  return (
    <div className="space-y-10">
      {page.intro && (
        <p className="text-lg leading-relaxed text-[var(--text-muted)]">
          {page.intro}
        </p>
      )}

      <section className="flex flex-col items-center gap-8 rounded-xl border border-[var(--divider)] bg-[var(--card-bg)] p-6 sm:flex-row sm:items-start sm:p-8">
        {imageSrc && (
          <div className="shrink-0">
            <Image
              src={imageSrc}
              alt={profile.name}
              width={200}
              height={200}
              className="h-[200px] w-[200px] rounded-full border-4 border-[var(--theme-color)] object-cover shadow-md"
              priority
            />
          </div>
        )}

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="font-serif text-2xl font-bold">{profile.name}</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
            <li>
              <span className="font-medium text-[var(--text)]">Position: </span>
              {profile.position}
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">Institution: </span>
              {profile.institution}
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">
                Research interests:{" "}
              </span>
              {profile.researchInterests}
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">Profile: </span>
              <Link
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--theme-color)] hover:underline"
              >
                {profile.name}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </li>
          </ul>

          <Link
            href={`mailto:${profile.email}`}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--theme-color)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--theme-color-dark)]"
          >
            <Mail className="h-4 w-4" />
            Email {profile.name.split(" ").pop()}
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
          <MapPin className="h-5 w-5 text-[var(--theme-color)]" />
          Address
        </h3>
        <address className="not-italic leading-relaxed text-[var(--text-muted)]">
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
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
          <GraduationCap className="h-5 w-5 text-[var(--theme-color)]" />
          Graduate applicants
        </h3>
        <p className="text-[var(--text-muted)]">
          Please see{" "}
          <Link
            href={profile.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--theme-color)] hover:underline"
          >
            information on applying to the lab
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
