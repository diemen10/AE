import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostSafe(params.slug);
  if (!post) {
    return {
      title: "Artículo no encontrado | Tu Asesoría de Extranjería",
    };
  }

  return {
    title: `${post.title} | Tu Asesoría de Extranjería`,
    description: post.excerpt ?? "Contenido sobre extranjería y trámites en España.",
  };
}

async function getPostSafe(slug: string) {
  try {
    return await getPostBySlug(slug);
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostSafe(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-sm text-cyan-700 hover:text-cyan-800">
          ← Volver al blog
        </Link>
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>{formatDate(post.date)}</span>
            {post.readingTime ? <span>• {post.readingTime}</span> : null}
          </div>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">{post.title}</h1>
          {post.excerpt ? <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p> : null}
          {post.tags.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-full">
                  #{tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </header>

        <div
          className="mt-10 space-y-6 text-base leading-7 text-slate-700 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-slate-900 [&>p]:text-slate-700 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>a]:text-cyan-700 [&>a]:underline"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">¿Quieres que revisemos tu caso?</h2>
          <p className="mt-3 text-slate-600">
            Escríbenos por WhatsApp y te ayudamos a preparar tu trámite paso a paso.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="rounded-2xl">
              <Link href="/#contacto">Hablar con la asesoría</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href="/" rel="noreferrer">
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
