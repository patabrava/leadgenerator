import type { Metadata } from "next";
import { Source_Serif_4, Outfit } from "next/font/google";

import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
  weight: ["600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "deinvergleich.com - Datenschutz-Anbieter Vergleich",
  description: "Deutschlands führendes Vergleichsportal für Datenschutz-Dienstleister. Finden Sie kostenlos den passenden DSGVO-Experten für Ihr Unternehmen.",
  keywords: "DSGVO Vergleich, Datenschutz Anbieter, Datenschutzbeauftragter finden, DSB Vergleich, Datenschutz Portal, DSGVO Beratung",
  authors: [{ name: "deinvergleich.com" }],
  creator: "deinvergleich.com",
  publisher: "deinvergleich.com",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://deinvergleich.com",
    siteName: "deinvergleich.com",
    title: "deinvergleich.com - Datenschutz-Anbieter Vergleich",
    description: "Deutschlands führendes Vergleichsportal für Datenschutz-Dienstleister. Finden Sie kostenlos den passenden DSGVO-Experten für Ihr Unternehmen.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "deinvergleich.com - DSGVO-Experte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "deinvergleich.com - Datenschutz-Anbieter Vergleich",
    description: "Deutschlands führendes Vergleichsportal für Datenschutz-Dienstleister. Finden Sie kostenlos den passenden DSGVO-Experten für Ihr Unternehmen.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://deinvergleich.com",
  },
  other: {
    "theme-color": "#0f766e",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${sourceSerif.variable} ${outfit.variable}`}>
      <body className="font-body min-h-screen bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}
