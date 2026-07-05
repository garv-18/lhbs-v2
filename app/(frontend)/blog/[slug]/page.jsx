import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import { notFound } from 'next/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Cinzel, Manrope } from "next/font/google";
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const revalidate = 60;

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
  });

  return pages.docs.map((page) => ({
    slug: page.slug,
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
  });

  const post = data.docs[0];

  if (!post) {
    notFound();
  }

  return (
    <div className={`min-h-screen pt-32 pb-20 bg-white ${manrope.className}`}>
      <div className="max-w-3xl mx-auto px-6">
        
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-10"
        >
          <ChevronLeft size={16} />
          Back to Blog
        </Link>

        <header className="mb-12 border-b border-gray-100 pb-10">
          <h1 className={`text-4xl md:text-5xl font-bold text-text leading-tight mb-6 ${cinzel.className}`}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
            <span>Published on {new Date(post.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span>&bull;</span>
            <span>Live Healthy and Be Safe</span>
          </div>
        </header>

        <article className="prose prose-lg prose-gray max-w-none">
          {post.content ? (
            <RichText data={post.content} />
          ) : (
            <p className="text-gray-500 italic">This post has no content.</p>
          )}
        </article>

      </div>
    </div>
  );
}
