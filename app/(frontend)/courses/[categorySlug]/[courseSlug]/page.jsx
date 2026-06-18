import { Cinzel, Manrope } from "next/font/google";
import TextureBackground from "../../../components/TextureBackground";
import InstamojoButton from "../../../components/InstamojoButton";
import { CheckCircle2, Shield, Zap, Award } from "lucide-react";
import Image from "next/image";
import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config';
import { RichText } from '@payloadcms/richtext-lexical/react';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export async function generateMetadata({ params }) {
  const { courseSlug } = await params;
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'coursenames',
    where: { slug: { equals: courseSlug } },
    depth: 1
  });
  
  const course = data.docs[0];

  if (!course) {
    return {
      title: 'Course Not Found | LHBS',
      description: 'The requested course could not be found.',
    };
  }

  return {
    title: `${course.title} | LHBS`,
    description: course.description,
    openGraph: {
      title: `${course.title} | LHBS`,
      description: course.description,
      images: [
        {
          url: course.image?.url || course.image,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
  };
}

export const revalidate = 60; // ISR cache revalidation
export const dynamicParams = true;

export default async function CoursePage({ params }) {
  // Await params for Next.js 15 compatibility
  const { courseSlug } = await params;

  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'coursenames',
    where: { slug: { equals: courseSlug } },
    depth: 1
  });
  
  const course = data.docs[0];

  if (!course) return (
    <div className="min-h-screen bg-background flex items-center justify-center text-text">
      <h1 className="text-2xl font-bold">Course Not Found</h1>
    </div>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": "LHBS",
      "sameAs": "https://masterpramod.com/lhbs"
    },
    "offers": {
      "@type": "Offer",
      "price": course.price,
      "priceCurrency": "INR",
      "category": "Paid"
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative pt-24 pb-12 w-full max-w-7xl mx-auto px-4">
        <div className="mb-8">
            <span className="inline-block px-3 py-1 mb-4 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold tracking-widest uppercase">
              {course.courseType === 'master' ? 'Premium Course' : 'Fundamentals Course'}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-text leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              {course.slogan || course.description.substring(0, 150) + "..."}
            </p>
        </div>

        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-md">
            <img
                src={course.image?.url || course.image}
                alt={course.title}
                className="object-cover w-full h-full"
            />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Description & Features */}
          <div className="lg:col-span-2 space-y-12">
            <div className="prose prose-lg prose-gray max-w-none">
              <h2 className="text-2xl font-bold mb-6 text-text">About This Course</h2>
              <div className="text-gray-600 leading-relaxed">
                {course.descriptionRichText ? (
                  <RichText data={course.descriptionRichText} />
                ) : (
                  <p>{course.description}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-10">
                <h2 className="text-2xl font-bold mb-6 text-text">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.features && course.features.length > 0 && course.features.map((featureObj, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-primary mt-0.5">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-text">{featureObj.feature}</h3>
                    </div>
                    </div>
                ))}
                {!course.features && (
                    <>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="text-primary mt-0.5"><Shield size={20} /></div>
                        <div><h3 className="text-base font-semibold text-text">Self Defense</h3><p className="text-sm text-gray-500">Protect yourself in any situation.</p></div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="text-primary mt-0.5"><Zap size={20} /></div>
                        <div><h3 className="text-base font-semibold text-text">Speed & Power</h3><p className="text-sm text-gray-500">Enhance your physical capabilities.</p></div>
                    </div>
                    </>
                )}
                </div>
            </div>
          </div>

          {/* Right Column: Pricing Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
              <div className="mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-extrabold text-text">₹{course.price.toLocaleString()}</span>
                  <span className="text-gray-400 line-through text-lg mb-1">₹{(course.price + 2000).toLocaleString()}</span>
                </div>
                <p className="text-gray-500 text-sm">One-Time Payment for full lifetime access</p>
                <div className="mt-4 inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold border border-green-100">
                  <Award size={16} />
                  <span>Certified Course</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold text-text">Lifetime Access</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Level</span>
                  <span className="font-semibold text-text">All Levels</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Language</span>
                  <span className="font-semibold text-text">English / Hindi</span>
                </div>
              </div>

              <InstamojoButton
                amount={course.price}
                courseSlug={courseSlug}
                className="w-full py-4 rounded-xl bg-primary text-white font-bold text-base hover:bg-primary-hover hover:shadow-lg transition-all duration-300"
              />

              <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                25-Day Money-Back Guarantee • Secure Payment
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
