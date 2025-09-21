import Link from "next/link";

export default function GraciasPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl md:text-4xl font-bold">Gracias!</h1>
      <p className="mt-3 text-slate-600">
        Hemos recibido tu mensaje. Te contactaremos muy pronto por email o WhatsApp.
      </p>
      <Link href="/" className="inline-block mt-8 underline">
        Volver al inicio
      </Link>
    </div>
  );
}
