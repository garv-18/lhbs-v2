import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config';
import { notFound } from 'next/navigation';
import { Cinzel, Manrope } from "next/font/google";
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700", "800"] });

export const revalidate = 3600; // Cache for 1 hour

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  
  const niches = await payload.find({ collection: 'pseo-niches', limit: 100 });
  const audiences = await payload.find({ collection: 'pseo-audiences', limit: 100 });

  const params = [];
  
  for (const niche of niches.docs) {
    for (const audience of audiences.docs) {
      params.push({
        niche: niche.slug,
        audience: audience.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { niche, audience } = await params;
  
  const payload = await getPayload({ config: configPromise });
  const nicheData = await payload.find({ collection: 'pseo-niches', where: { slug: { equals: niche } } });
  const audienceData = await payload.find({ collection: 'pseo-audiences', where: { slug: { equals: audience } } });

  const n = nicheData.docs[0];
  const a = audienceData.docs[0];

  if (!n || !a) {
    return { title: 'Not Found | LHBS' };
  }

  const title = `${n.name} ${a.name} | Live Healthy and Be Safe`;
  const description = `Discover ${n.name.toLowerCase()} tailored specifically ${a.name.toLowerCase()}. ${a.benefits}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.martialartsschool.in/discover/${niche}/${audience}`,
      siteName: 'Live Healthy and Be Safe',
    },
    alternates: {
      canonical: `https://www.martialartsschool.in/discover/${niche}/${audience}`,
    }
  };
}

export default async function PseoLandingPage({ params }) {
  const { niche, audience } = await params;

  const payload = await getPayload({ config: configPromise });
  const nicheRes = await payload.find({ collection: 'pseo-niches', where: { slug: { equals: niche } }, depth: 2 });
  const audienceRes = await payload.find({ collection: 'pseo-audiences', where: { slug: { equals: audience } } });

  const n = nicheRes.docs[0];
  const a = audienceRes.docs[0];

  if (!n || !a) {
    notFound();
  }

  // Generate FAQ schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${n.name} good ${a.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes. If you struggle with ${a.painPoints.toLowerCase()}, our program provides a safe and structured environment. It ${a.benefits.toLowerCase()}`
        }
      },
      {
        "@type": "Question",
        "name": `What are the benefits of ${n.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": n.description
        }
      }
    ]
  };

  const courses = n.relatedCourses || [];

  return (
    <div className={`min-h-screen bg-background text-text ${manrope.className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-6">
            Specialized Training Program
          </span>
          <h1 className={`text-5xl md:text-7xl font-black mb-8 leading-tight ${cinzel.className}`}>
            <span className="text-primary">{n.name}</span> <br/>
            {a.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Overcome <span className="font-semibold text-gray-800">{a.painPoints.toLowerCase()}</span>
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            {n.description} This program {a.benefits.toLowerCase()}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#programs" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
              View Programs <ArrowRight size={20} />
            </Link>
            <Link href="/contact" className="bg-white border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:border-primary hover:text-primary transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Program Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${cinzel.className}`}>Why Choose Us?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary mt-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${cinzel.className}`}>Targeted Approach</h3>
                  <p className="text-gray-600 leading-relaxed">Unlike generic gyms, our {n.name.toLowerCase()} program is structured specifically {a.name.toLowerCase()}, addressing your exact needs.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary mt-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${cinzel.className}`}>Real Results</h3>
                  <p className="text-gray-600 leading-relaxed">{a.benefits}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary mt-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${cinzel.className}`}>Expert Guidance</h3>
                  <p className="text-gray-600 leading-relaxed">Master Pramod Goswami provides personalized attention ensuring you progress safely and effectively.</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/hero_img.webp" 
                alt={`${n.name} ${a.name}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className={`text-2xl font-bold ${cinzel.className}`}>Master Your Potential</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Courses */}
      {courses.length > 0 && (
        <section id="programs" className="py-24 bg-gray-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${cinzel.className}`}>Recommended Programs</h2>
              <p className="text-gray-600">The best paths forward for your journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => {
                const imgUrl = course.image?.url || course.image;
                const categorySlug = course.category?.slug || 'program';
                return (
                  <Link 
                    href={`/courses/${categorySlug}/${course.slug}`} 
                    key={course.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      {imgUrl ? (
                        <Image 
                          src={imgUrl} 
                          alt={course.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                        <span className="font-bold text-gray-900">₹{course.price}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                        {course.category?.title || 'Program'}
                      </div>
                      <h3 className={`text-2xl font-bold mb-3 group-hover:text-primary transition-colors ${cinzel.className}`}>
                        {course.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-1">
                        {course.slogan || course.description}
                      </p>
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <span className="font-semibold text-gray-900 flex items-center gap-2 group-hover:gap-3 transition-all">
                          Enroll Now <ArrowRight size={16} className="text-primary" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-10" />
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${cinzel.className}`}>Ready to Transform?</h2>
          <p className="text-xl mb-10 text-white/90">Join Live Healthy and Be Safe today and take the first step towards a stronger, more focused you.</p>
          <Link href="/joinus" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all inline-block shadow-xl hover:shadow-2xl hover:-translate-y-1">
            Start Your Journey
          </Link>
        </div>
      </section>

    </div>
  );
}
