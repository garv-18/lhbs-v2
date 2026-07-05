import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import { notFound } from 'next/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Cinzel, Manrope } from "next/font/google";
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { injectLinks, getLinkingDictionary } from '../../utils/injectLinks';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const revalidate = 60;

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const terms = await payload.find({
    collection: 'glossary',
    limit: 1000,
  });

  return terms.docs.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'glossary',
    where: { slug: { equals: slug } },
  });

  const term = data.docs[0];

  if (!term) {
    return {
      title: 'Term Not Found | LHBS Glossary',
      description: 'The requested martial arts term could not be found.',
    };
  }

  const title = term.metaTitle || `What is ${term.term}? | LHBS Martial Arts Glossary`;
  const description = term.metaDescription || `Read the full definition and explanation of ${term.term} in the Live Healthy and Be Safe Martial Arts Glossary.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.martialartsschool.in/glossary/${slug}`,
      siteName: 'Live Healthy and Be Safe',
    },
    alternates: {
      canonical: `https://www.martialartsschool.in/glossary/${slug}`,
    }
  };
}

const GlossaryTerm = async ({ params }) => {
  const { slug } = await params;

  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'glossary',
    where: { slug: { equals: slug } },
  });

  const term = data.docs[0];

  if (!term) {
    notFound();
  }

  // Fetch dictionary
  const dictionary = await getLinkingDictionary(payload);

  // Fetch all terms to find previous/next
  const allTermsData = await payload.find({
    collection: 'glossary',
    limit: 1000,
    sort: 'term',
  });
  
  const allTerms = allTermsData.docs;
  const currentIndex = allTerms.findIndex(t => t.slug === slug);
  const prevTerm = currentIndex > 0 ? allTerms[currentIndex - 1] : null;
  const nextTerm = currentIndex < allTerms.length - 1 ? allTerms[currentIndex + 1] : null;

  return (
    <div className={`min-h-screen pt-32 pb-20 bg-gray-50 ${manrope.className}`}>
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link 
          href="/glossary" 
          className="inline-flex items-center text-primary font-medium hover:underline transition-all"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Glossary Directory
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Main Content Box */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 text-primary/10">
            <BookOpen size={120} />
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-8 text-gray-900 relative z-10 ${cinzel.className}`}>
            {term.term}
          </h1>

          <article className="prose prose-lg prose-gray max-w-none relative z-10">
            {term.definition ? (() => {
              // Inject the links into the Lexical AST
              const linkedContent = injectLinks(term.definition, dictionary);

              return <RichText data={linkedContent} />;
            })() : (
              <p className="text-gray-500 italic">This term currently has no detailed definition.</p>
            )}
          </article>
        </div>

        {/* Previous / Next Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4">
          {prevTerm ? (
            <Link 
              href={`/glossary/${prevTerm.slug}`}
              className="w-full sm:w-auto bg-white border border-gray-200 px-6 py-4 rounded-xl flex flex-col hover:border-primary transition-colors"
            >
              <span className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Previous Term</span>
              <span className="font-semibold text-primary">{prevTerm.term}</span>
            </Link>
          ) : <div className="w-full sm:w-auto"></div>}

          {nextTerm ? (
            <Link 
              href={`/glossary/${nextTerm.slug}`}
              className="w-full sm:w-auto bg-white border border-gray-200 px-6 py-4 rounded-xl flex flex-col text-right hover:border-primary transition-colors"
            >
              <span className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Next Term</span>
              <span className="font-semibold text-primary">{nextTerm.term}</span>
            </Link>
          ) : <div className="w-full sm:w-auto"></div>}
        </div>

      </div>
    </div>
  );
};

export default GlossaryTerm;
