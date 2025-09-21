// Configuración centralizada de metadatos para SEO en Next.js (App Router)
// Coloca este archivo en /app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Tu Asesoría de Extranjería | Madrid & Online",
    template: "%s | Tu Asesoría de Extranjería",
  },
  description:
    "Trámites migratorios claros, rápidos y sin estrés. Especialistas en visados de estudios y trabajo, arraigos y nacionalidad para latinoamericanos en España.",
  keywords: [
    "extranjería",
    "asesoría migratoria",
    "visado de estudios España",
    "arraigo social",
    "nacionalidad española",
    "residencia trabajo",
  ],
  authors: [{ name: "Tu Asesoría de Extranjería" }],
  creator: "Tu Asesoría de Extranjería",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://tuextranjeria.com",
    siteName: "Tu Asesoría de Extranjería",
    title: "Tu Asesoría de Extranjería | Madrid & Online",
    description:
      "Trámites migratorios claros, rápidos y sin estrés. Especialistas en visados de estudios y trabajo, arraigos y nacionalidad para latinoamericanos en España.",
    images: [
      {
        url: "https://tuextranjeria.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tu Asesoría de Extranjería",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu Asesoría de Extranjería | Madrid & Online",
    description:
      "Trámites migratorios claros, rápidos y sin estrés. Especialistas en visados de estudios y trabajo, arraigos y nacionalidad para latinoamericanos en España.",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
