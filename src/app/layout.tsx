import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, siteName } from "@/lib/site-config";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    title: siteName,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName,
    locale: siteConfig.lang,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.lang} suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${robotoSlab.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-[var(--max-width)] flex-1 px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
