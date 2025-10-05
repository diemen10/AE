import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPostsMeta } from "@/lib/blog";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export const metadata: Metadata = {
  title: "Blog sobre extranjería | Tu Asesoría de Extranjería",
  description:
    "Artículos prácticos sobre visados, arraigo, nacionalidad y trámites de extranjería en España.",
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <Badge className="rounded-full bg-slate-900 text-white">Blog</Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">Recursos y guías de extranjería</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Actualizaciones, tutoriales y consejos para preparar tus visados, cambios de residencia y procesos de
            nacionalidad sin sobresaltos.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur hover:shadow-md transition"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{formatDate(post.date)}</div>
                <h2 className="mt-3 text-xl font-semibold text-slate-900">{post.title}</h2>
                {post.excerpt ? <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p> : null}
                {post.tags.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                  <span>{post.readingTime ?? "Lectura rápida"}</span>
                  <Link href={`/blog/${post.slug}`} className="font-medium text-cyan-700 hover:text-cyan-800">
                    Leer artículo
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-slate-500 mt-16">
            Aún no hay artículos publicados. Vuelve pronto o contáctanos por WhatsApp si necesitas ayuda inmediata.
          </div>
        ) : null}

        <div className="mt-20 flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-semibold">¿Necesitas asesoría personalizada?</h2>
          <p className="text-slate-600 max-w-xl">
            Reserva una llamada gratuita y revisamos tu caso paso a paso para darte un plan de acción.
          </p>
          <Button asChild className="rounded-2xl">
            <Link href="/#contacto">Ir a contacto</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
