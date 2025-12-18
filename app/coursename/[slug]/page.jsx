import { Cinzel, Manrope } from "next/font/google";
import TextureBackground from "../../components/TextureBackground";
import InstamojoButton from "../../components/InstamojoButton";
import { CheckCircle2, Shield, Zap, Award } from "lucide-react";
import { masterCourses, regularCourses } from "../../utils/courseData";
import Image from "next/image";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const allCourses = [...regularCourses, ...masterCourses];
  const course = allCourses.find(c => c.slug === slug);

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
          url: course.image,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
  };
}

export default async function CoursePage({ params }) {
  // Await params for Next.js 15 compatibility
  const { slug } = await params;

  // Combine both course lists to search
  const allCourses = [...regularCourses, ...masterCourses];

  // Find course by slug
  const course = allCourses.find(c => c.slug === slug);

  if (!course) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
      <h1 className={`text-2xl ${cinzel.className}`}>Course Not Found</h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FD5D2F] selection:text-white">
      <TextureBackground />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#0a0a0a] z-10"></div>
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover object-center transform scale-105"
          priority
          quality={90}
        />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="max-w-7xl mx-auto">
            <span className={`inline-block px-4 py-1 mb-4 rounded-full bg-[#FD5D2F]/20 border border-[#FD5D2F]/30 text-[#FD5D2F] text-sm font-bold tracking-widest uppercase ${manrope.className}`}>
              Premium Course
            </span>
            <h1 className={`text-5xl md:text-7xl font-bold mb-4 text-white ${cinzel.className}`}>
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Description & Features */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10">
              <h2 className={`text-3xl font-bold mb-6 text-white ${cinzel.className}`}>About This Course</h2>
              <p className={`text-gray-300 text-lg leading-relaxed ${manrope.className}`}>
                {course.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.features && course.features.map((feature, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 transition-colors">
                  <div className="bg-[#FD5D2F]/20 p-3 rounded-full text-[#FD5D2F]">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold text-white mb-1 ${manrope.className}`}>{feature}</h3>
                    <p className="text-sm text-gray-400">Master this essential skill.</p>
                  </div>
                </div>
              ))}
              {!course.features && (
                <>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                    <div className="bg-[#FD5D2F]/20 p-3 rounded-full text-[#FD5D2F]"><Shield size={24} /></div>
                    <div><h3 className="text-lg font-bold text-white">Self Defense</h3><p className="text-sm text-gray-400">Protect yourself in any situation.</p></div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                    <div className="bg-[#FD5D2F]/20 p-3 rounded-full text-[#FD5D2F]"><Zap size={24} /></div>
                    <div><h3 className="text-lg font-bold text-white">Speed & Power</h3><p className="text-sm text-gray-400">Enhance your physical capabilities.</p></div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Pricing Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <p className={`text-gray-400 text-sm uppercase tracking-widest mb-2 ${manrope.className}`}>One-Time Payment</p>
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-5xl font-bold text-white ${cinzel.className}`}>₹{course.price.toLocaleString()}</span>
                  <span className="text-gray-500 line-through text-xl">₹{(course.price + 2000).toLocaleString()}</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  <Award size={16} />
                  <span>Certified Course</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-gray-300 text-sm border-b border-white/10 pb-3">
                  <span>Duration</span>
                  <span className="font-bold text-white">Lifetime Access</span>
                </div>
                <div className="flex items-center justify-between text-gray-300 text-sm border-b border-white/10 pb-3">
                  <span>Level</span>
                  <span className="font-bold text-white">All Levels</span>
                </div>
                <div className="flex items-center justify-between text-gray-300 text-sm border-b border-white/10 pb-3">
                  <span>Language</span>
                  <span className="font-bold text-white">English / Hindi</span>
                </div>
              </div>

              <InstamojoButton
                amount={course.price}
                courseSlug={slug}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C8295E] to-[#FD5D2F] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(253,93,47,0.4)] transition-all duration-300 transform hover:-translate-y-1"
              />

              <p className="text-center text-xs text-gray-500 mt-4">
                30-Day Money-Back Guarantee • Secure Payment
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}