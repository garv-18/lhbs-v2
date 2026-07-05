import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { Cinzel, Manrope } from "next/font/google";
import Link from 'next/link';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: 'Discover Our Programs | LHBS',
    description: 'Explore tailored training programs for every background and goal.',
  };
}

export default async function DiscoverIndex() {
  const payload = await getPayload({ config: configPromise });
  const nichesRes = await payload.find({ collection: 'pseo-niches', limit: 100 });
  const audiencesRes = await payload.find({ collection: 'pseo-audiences', limit: 100 });

  return (
    <div className={`min-h-screen pt-32 pb-20 bg-gray-50 ${manrope.className}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold text-text mb-4 ${cinzel.className}`}>
            Program Directory
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find the perfect training program tailored specifically for your lifestyle, goals, and background.
          </p>
        </div>

        <div className="space-y-16">
          {nichesRes.docs.map(niche => (
            <div key={niche.slug} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className={`text-3xl font-bold mb-4 text-primary ${cinzel.className}`}>{niche.name}</h2>
              <p className="text-gray-600 mb-8 max-w-3xl">{niche.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {audiencesRes.docs.map(audience => (
                  <Link 
                    key={`${niche.slug}-${audience.slug}`}
                    href={`/discover/${niche.slug}/${audience.slug}`}
                    className="flex items-center p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <span className="text-gray-700 font-semibold group-hover:text-primary transition-colors">
                      {audience.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
