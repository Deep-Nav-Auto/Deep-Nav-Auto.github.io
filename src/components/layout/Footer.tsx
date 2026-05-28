import { siteConfig, siteName } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--divider)] bg-[var(--footer-bg)] py-6 text-sm text-[var(--footer-text)]">
      <div className="mx-auto max-w-[var(--max-width)] px-4 text-center">
        <p>
          © {year} {siteName}. {siteConfig.footerText}
        </p>
      </div>
    </footer>
  );
}
