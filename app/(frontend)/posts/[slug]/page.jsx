import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import { notFound } from 'next/navigation';
import { Cinzel, Manrope } from "next/font/google";
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import parse from 'html-react-parser';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise });
    const pages = await payload.find({
      collection: 'posts',
      limit: 1000,
    });

    return pages.docs.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.warn("Could not generate static params for posts, table might not exist yet:", error.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const payload = await getPayload({ config: configPromise });
  let post = null;

  try {
    const data = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
    });
    post = data.docs[0];
  } catch (error) {
    console.warn("Could not fetch metadata for post, table might not exist yet:", error.message);
  }

  if (!post) {
    return {
      title: 'Post Not Found | LHBS',
    };
  }

  const title = post.metaTitle || `${post.title} | LHBS Blog`;
  const description = post.metaDescription || `Read ${post.title} on the Live Healthy and Be Safe blog.`;

  return {
    title,
    description,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  const payload = await getPayload({ config: configPromise });
  let post = null;
  
  try {
    const data = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
    });
    post = data.docs[0];
  } catch (error) {
    console.warn("Could not fetch post content, table might not exist yet:", error.message);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className={`min-h-screen pt-32 pb-20 bg-white ${manrope.className}`}>
      <div className="max-w-3xl mx-auto px-6">
        
        {post.coverImageUrl && (
          <div className="mb-12 w-full h-auto max-h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <header className="mb-12 border-b border-gray-100 pb-10">
          <h1 className={`text-4xl md:text-6xl font-bold text-text leading-tight mb-6 ${cinzel.className}`}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
            <span>Published on {format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
            <span>&bull;</span>
            <span>Live Healthy and Be Safe</span>
          </div>
        </header>

        <article className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl prose-img:shadow-sm">
          {post.contentHtml ? parse(post.contentHtml) : (
            <p className="text-gray-500 italic">This post has no content.</p>
          )}
        </article>

      </div>
    </div>
  );
}
