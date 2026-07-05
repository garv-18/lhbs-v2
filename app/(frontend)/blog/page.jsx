import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import Link from 'next/link';
import { Cinzel, Manrope } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const revalidate = 60;

export default async function BlogIndex() {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch all pages (acting as blog posts)
  const pagesRes = await payload.find({
    collection: 'pages',
    sort: '-updatedAt',
    limit: 100,
  });

  const posts = pagesRes.docs;

  return (
    <div className={`min-h-screen pt-32 pb-20 bg-gray-50 ${manrope.className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold text-text mb-4 ${cinzel.className}`}>
            Our Blog
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Read the latest updates, tips, and stories from our community.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p>No posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex-1">
                  <h2 className={`text-2xl font-bold text-text mb-4 group-hover:text-primary transition-colors line-clamp-2 ${cinzel.className}`}>
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                    Click to read more about {post.title.toLowerCase()} and discover insights from Live Healthy and Be Safe.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {new Date(post.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Post &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
