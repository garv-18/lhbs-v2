import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import { Cinzel, Manrope } from "next/font/google";
import Link from 'next/link';
import { format } from 'date-fns';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const revalidate = 60;

export const metadata = {
  title: 'Blog | Live Healthy and Be Safe',
  description: 'Read the latest insights on martial arts, health, and philosophy.',
};

export default async function PostsIndex() {
  const payload = await getPayload({ config: configPromise });
  let posts = [];
  
  try {
    const data = await payload.find({
      collection: 'posts',
      limit: 100,
      sort: '-createdAt', // newest first
    });
    posts = data.docs;
  } catch (error) {
    console.warn("Could not fetch posts, table might not exist yet:", error.message);
  }

  return (
    <div className={`min-h-screen bg-gray-50 text-text ${manrope.className}`}>
      
      {/* Header */}
      <section className="relative pt-40 pb-20 px-6 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent z-0" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${cinzel.className}`}>Our Blog</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Insights on martial arts, health, and philosophy.
          </p>
        </div>
      </section>

      {/* Directory Content */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No posts published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    {/* Optionally add Cover Image rendering here if it exists in Payload */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <span className="text-white text-sm font-medium">
                        {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                      {post.metaDescription || "Read more about this topic..."}
                    </p>
                    <div className="text-primary font-bold text-sm uppercase tracking-wider group-hover:underline">
                      Read Article &rarr;
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
