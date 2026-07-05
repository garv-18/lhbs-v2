import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import { Cinzel, Manrope } from "next/font/google";
import Link from 'next/link';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700", "800"] });

export const revalidate = 60;

export const metadata = {
  title: 'Martial Arts Glossary | LHBS',
  description: 'The complete encyclopedic dictionary of Martial Arts, Qigong, and Holistic Health terms.',
};

const GlossaryIndex = async () => {
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'glossary',
    limit: 1000,
    sort: 'term',
  });

  const terms = data.docs;

  // Group terms alphabetically
  const groupedTerms = terms.reduce((acc, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(term);
    return acc;
  }, {});

  const alphabet = Object.keys(groupedTerms).sort();

  return (
    <div className={`min-h-screen bg-background text-text ${manrope.className}`}>
      
      {/* Header */}
      <section className="relative pt-40 pb-20 px-6 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent z-0" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${cinzel.className}`}>Martial Arts Glossary</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            The complete encyclopedic dictionary for martial arts, internal energy, and holistic health.
          </p>
        </div>
      </section>

      {/* Directory Content */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {alphabet.map((letter) => (
            <div key={letter} className="mb-12">
              <h2 className={`text-4xl font-bold text-primary mb-6 border-b-2 border-primary/20 pb-2 ${cinzel.className}`}>
                {letter}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedTerms[letter].map((term) => (
                  <Link 
                    key={term.slug} 
                    href={`/glossary/${term.slug}`}
                    className="block p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group bg-white"
                  >
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">
                      {term.term}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GlossaryIndex;
