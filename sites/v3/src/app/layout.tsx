import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/brand";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"], // latin-ext covers Slovenian č/š/ž
  variable: "--font-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: brand.seo.title,
    template: `%s · ${brand.name}`,
  },
  description: brand.seo.description,
  openGraph: {
    type: "website",
    locale: brand.locale,
    siteName: brand.name,
    title: brand.seo.title,
    description: brand.seo.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={brand.lang} className={`${sourceSans.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/assets/blue/signapps_S_rounded.ico" />
      </head>
      <body className="min-h-screen bg-ink-950 font-sans">
        <Header />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
