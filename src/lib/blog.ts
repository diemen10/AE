import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: string;
  slug?: string;
};

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime?: string;
};

export type BlogPost = BlogMeta & {
  contentHtml: string;
};

function toSlug(fileName: string, frontmatterSlug?: string): string {
  if (frontmatterSlug) {
    return frontmatterSlug;
  }

  const base = fileName.replace(/.(md|mdx)$/i, "");
  const parts = base.split("-");
  if (parts.length > 3) {
    return parts.slice(3).join("-");
  }
  if (parts.length > 1) {
    return parts.slice(1).join("-");
  }
  return base;
}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    throw new Error(`No se encontró la carpeta de posts en ${BLOG_DIR}`);
  }
}

export async function getAllPostsMeta(): Promise<BlogMeta[]> {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    const frontmatter = data as BlogFrontmatter;
    const slug = toSlug(file, frontmatter.slug);

    if (!frontmatter.title || !frontmatter.date) {
      throw new Error(`El post ${file} necesita al menos 'title' y 'date' en el frontmatter.`);
    }

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt ?? "",
      tags: frontmatter.tags ?? [],
      readingTime: frontmatter.readingTime,
    } satisfies BlogMeta;
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const match = files.find((file) => {
    const fileSlug = toSlug(file);
    if (fileSlug === slug) return true;

    const filePath = path.join(BLOG_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    const frontmatter = data as BlogFrontmatter;
    return frontmatter.slug === slug;
  });

  if (!match) {
    throw new Error(`No se encontró el post con slug '${slug}'.`);
  }

  const filePath = path.join(BLOG_DIR, match);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as BlogFrontmatter;
  const resolvedSlug = toSlug(match, frontmatter.slug);

  if (!frontmatter.title || !frontmatter.date) {
    throw new Error(`El post ${match} necesita al menos 'title' y 'date'.`);
  }

  const processedContent = await remark().use(remarkGfm).use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug: resolvedSlug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt ?? "",
    tags: frontmatter.tags ?? [],
    readingTime: frontmatter.readingTime,
    contentHtml,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPostsMeta();
  return posts.map((post) => post.slug);
}
