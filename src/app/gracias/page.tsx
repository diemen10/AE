import Link from "next/link";
import Script from "next/script";

const messages = {
  contact: {
    title: "�Gracias por contactarnos!",
    body:
      "Hemos recibido tu mensaje. Te escribiremos por email o WhatsApp en menos de 24 horas para revisar tu caso.",
    ctaLabel: "Volver al inicio",
    ctaHref: "/",
  },
  newsletter: {
    title: "�Suscripci�n confirmada!",
    body:
      "Te enviaremos recursos y avisos importantes sobre extranjer�a. Revisa tu bandeja de entrada (y la carpeta de spam por si acaso).",
    ctaLabel: "Leer el blog",
    ctaHref: "#servicios",
  },
  default: {
    title: "�Gracias!",
    body:
      "Tu acci�n se ha completado correctamente. Si necesitas algo m�s, estaremos encantados de ayudarte.",
    ctaLabel: "Volver al inicio",
    ctaHref: "/",
  },
} as const;

type GraciasPageProps = {
  searchParams: {
    source?: string;
  };
};

const CONTACT_CONVERSION_EVENT = "contact_form_submit";

export default function GraciasPage({ searchParams }: GraciasPageProps) {
  const variantKey = (searchParams.source ?? "default") as keyof typeof messages;
  const variant = messages[variantKey] ?? messages.default;

  const shouldPushContactEvent = variantKey === "contact";

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl md:text-4xl font-bold">{variant.title}</h1>
      <p className="mt-3 text-slate-600">{variant.body}</p>
      <Link href={variant.ctaHref} className="inline-block mt-8 underline">
        {variant.ctaLabel}
      </Link>

      {shouldPushContactEvent ? (
        <Script id="gtm-contact" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: '${CONTACT_CONVERSION_EVENT}' });
          `}
        </Script>
      ) : null}
    </div>
  );
}
