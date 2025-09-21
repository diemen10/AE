import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const GTAG_ID = GA_MEASUREMENT_ID ?? GADS_ID;

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
      <body className={inter.className}>
        {children}
        <Analytics />
        {GTAG_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ""}
                ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
