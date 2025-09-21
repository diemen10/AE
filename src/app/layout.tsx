// ConfiguraciÃ³n centralizada de metadatos para SEO en Next.js (App Router)
// Coloca este archivo en /app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Tu AsesorÃ­a de ExtranjerÃ­a | Madrid & Online",
    template: "%s | Tu AsesorÃ­a de ExtranjerÃ­a",
  },
  description:
    "TrÃ¡mites migratorios claros, rÃ¡pidos y sin estrÃ©s. Especialistas en visados de estudios y trabajo, arraigos y nacionalidad para latinoamericanos en EspaÃ±a.",
  keywords: [
    "extranjerÃ­a",
    "asesorÃ­a migratoria",
    "visado de estudios EspaÃ±a",
    "arraigo social",
    "nacionalidad espaÃ±ola",
    "residencia trabajo",
  ],
  authors: [{ name: "Tu AsesorÃ­a de ExtranjerÃ­a" }],
  creator: "Tu AsesorÃ­a de ExtranjerÃ­a",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://tuextranjeria.com",
    siteName: "Tu AsesorÃ­a de ExtranjerÃ­a",
    title: "Tu AsesorÃ­a de ExtranjerÃ­a | Madrid & Online",
    description:
      "TrÃ¡mites migratorios claros, rÃ¡pidos y sin estrÃ©s. Especialistas en visados de estudios y trabajo, arraigos y nacionalidad para latinoamericanos en EspaÃ±a.",
    images: [
      {
        url: "https://tuextranjeria.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tu AsesorÃ­a de ExtranjerÃ­a",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu AsesorÃ­a de ExtranjerÃ­a | Madrid & Online",
    description:
      "TrÃ¡mites migratorios claros, rÃ¡pidos y sin estrÃ©s. Especialistas en visados de estudios y trabajo, arraigos y nacionalidad para latinoamericanos en EspaÃ±a.",
    images: ["https://tuextranjeria.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
