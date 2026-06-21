import { Cinzel, Manrope } from "next/font/google";
import TextureBackground from "../../../components/TextureBackground";
import { CheckCircle2, Shield, Zap, Award } from "lucide-react";
import Image from "next/image";
import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config';
import { RichText } from '@payloadcms/richtext-lexical/react';

import CourseHeaderClient from "../../../components/CourseHeaderClient";
import CourseGallery from "../../../components/CourseGallery";
import CourseSidebarClient from "../../../components/CourseSidebarClient";
import PricingCard from "../../../components/PricingCard";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const courses = await payload.find({
    collection: 'coursenames',
    limit: 1000,
    select: { slug: true, category: true },
    populate: {
      category: {
        select: { slug: true }
      }
    }
  });

  return courses.docs.filter(course => course.category?.slug).map((course) => ({
    categorySlug: course.category.slug,
    courseSlug: course.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { categorySlug, courseSlug } = await params;
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'coursenames',
    where: { slug: { equals: courseSlug } },
    depth: 2
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
    alternates: {
      canonical: `https://www.martialartsschool.in/courses/${categorySlug}/${courseSlug}`,
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
    depth: 2
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
      "sameAs": "https://www.martialartsschool.in"
    },
    "offers": {
      "@type": "Offer",
      "price": course.price,
      "priceCurrency": "INR",
      "category": "Paid"
    }
  };

  // Extract photos for the gallery
  const photos = [course.image?.url || course.image].filter(Boolean);
  if (course.gallery && Array.isArray(course.gallery)) {
    course.gallery.forEach(item => {
      const imgUrl = item.image?.url || item.image;
      if (imgUrl && !photos.includes(imgUrl)) {
        photos.push(imgUrl);
      }
    });
  }

  // categorySlug comes from params, but let's extract it if it's there
  // Actually params is available in the page scope
  const { categorySlug } = await params;

  return (
    <div className="min-h-screen bg-background text-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-10 lg:pb-20">
        {/* Header Section */}
        <CourseHeaderClient 
          course={course} 
          categorySlug={categorySlug || 'master-program'} 
          courseSlug={courseSlug} 
        />

        {/* Gallery Section */}
        <CourseGallery photos={photos} title={course.title} />

        {/* Content Section (2-Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12 relative">
          
          {/* Left Column: Description & Features */}
          <div className="lg:col-span-2 space-y-12 pb-6 lg:pb-0">
            <div className="prose prose-lg prose-gray max-w-none">
              <h2 className={`text-2xl font-bold mb-6 text-text ${cinzel.className}`}>About This Course</h2>
              <div className="text-gray-600 leading-relaxed">
                {course.descriptionRichText ? (
                  <RichText data={course.descriptionRichText} />
                ) : (
                  <p>{course.description}</p>
                )}
              </div>
            </div>

            {/* Mobile Pricing Card Below About */}
            <div className="lg:hidden mt-8">
              <PricingCard course={course} courseSlug={courseSlug} />
            </div>

            <div className="border-t border-gray-100 pt-10">
                <h2 className={`text-2xl font-bold mb-6 text-text ${cinzel.className}`}>What you'll learn</h2>
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

          {/* Right Column: Pricing Sidebar & Mobile Bottom Bar */}
          <div className="lg:col-span-1">
            <CourseSidebarClient course={course} courseSlug={courseSlug} />
          </div>

        </div>
      </div>
    </div>
  );
}
