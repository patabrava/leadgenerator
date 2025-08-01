import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "deinvergleich.net - Datenschutz-Anbieter Vergleich",
  description: "Deutschlands führendes Vergleichsportal für Datenschutz-Dienstleister. Finden Sie kostenlos den passenden DSGVO-Experten für Ihr Unternehmen.",
  keywords: "DSGVO Vergleich, Datenschutz Anbieter, Datenschutzbeauftragter finden, DSB Vergleich, Datenschutz Portal, DSGVO Beratung",
  authors: [{ name: "deinvergleich.net" }],
  creator: "deinvergleich.net",
  publisher: "deinvergleich.net",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://deinvergleich.net",
    siteName: "deinvergleich.net",
    title: "deinvergleich.net - Datenschutz-Anbieter Vergleich",
    description: "Deutschlands führendes Vergleichsportal für Datenschutz-Dienstleister. Finden Sie kostenlos den passenden DSGVO-Experten für Ihr Unternehmen.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "deinvergleich.net - DSGVO-Experte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "deinvergleich.net - Datenschutz-Anbieter Vergleich",
    description: "Deutschlands führendes Vergleichsportal für Datenschutz-Dienstleister. Finden Sie kostenlos den passenden DSGVO-Experten für Ihr Unternehmen.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://deinvergleich.net",
  },
  other: {
    "theme-color": "#6366f1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-inter min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
