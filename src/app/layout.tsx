import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Analytics />
        {GTM_ID ? (
          <>
            <Script id="gtm-loader" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: "gtm.init" });
                (function(w,d,s,l,i){
                  w[l] = w[l] || [];
                  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
                  var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l !== "dataLayer" ? "&l=" + l : "";
                  j.async = true;
                  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                  f.parentNode.insertBefore(j, f);
                })(window, document, "script", "dataLayer", "${GTM_ID}");
              `}
            </Script>
            <noscript
              dangerouslySetInnerHTML={{
                __html: `
                  <iframe
                    src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"
                  ></iframe>
                `,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
