import Hero from "../components/Hero";
import Programs from "../components/Programs";
import Training from "../components/Training";
import AboutMaster from "../components/AboutMaster";
import ReviewCarousel from "../components/ReviewCarousel";
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import { Cinzel, Manrope } from "next/font/google";
import CourseImage from "../components/CourseImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const metadata = {
  title: "Test Home - Card Architecture",
};

// The sharp, clean Course Card
const CourseCard = ({ course, categorySlug }) => (
    <Link href={`/courses/${categorySlug}/${course.slug}`} className="min-w-[42vw] w-[42vw] sm:min-w-[280px] sm:w-[280px] md:min-w-[320px] md:w-[320px] shrink-0 snap-start bg-white border border-gray-200 rounded-none overflow-hidden flex flex-col shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all group">
        <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
            <CourseImage src={course.image?.url || course.image} alt={course.title} className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-red-500 transition-colors"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
        </div>
        <div className="p-4 md:p-5 flex-1 flex flex-col bg-white">
            <h3 className={`text-[13px] md:text-[16px] font-bold text-black leading-tight uppercase tracking-tight mb-2 line-clamp-2 ${cinzel.className}`}>
                {course.title}
            </h3>
            <p className={`text-[11px] md:text-[13px] text-gray-500 leading-snug line-clamp-2 mb-4 ${manrope.className}`}>
                {course.description}
            </p>
            <div className="mt-auto border-t border-gray-100 pt-3 flex flex-col">
                <span className={`text-[9px] md:text-[11px] text-gray-400 font-medium mb-1 ${manrope.className}`}>Total Price</span>
                <div className={`flex items-baseline text-[#0f172a] ${manrope.className}`}>
                    <span className="text-[10px] md:text-[12px] font-bold mr-[2px]">₹</span>
                    <span className="text-[16px] md:text-[20px] font-black tracking-tight leading-none">
                        {course.price ? course.price.toLocaleString() : '2,999'}
                    </span>
                </div>
            </div>
        </div>
    </Link>
);

// Variant 15 Layout mapped to real data
const Variant15CategoryCard = ({ category, courses }) => (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden py-10 md:py-16">
            <div className="relative">
                {/* Header (Left-aligned) */}
                <div className="px-6 md:px-10 mb-8">
                    <div className="max-w-3xl">
                        <span className={`text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block ${manrope.className}`}>Category Profile</span>
                        <h2 className={`text-3xl md:text-5xl font-bold text-black uppercase tracking-tight mb-3 ${cinzel.className}`}>
                            {category.title}
                        </h2>
                        <p className={`text-gray-500 leading-relaxed text-sm md:text-base ${manrope.className}`}>
                            {category.description || "Elevate your skills with elite coaching and proven methodologies. Discover the path that aligns with your ultimate goals."}
                        </p>
                    </div>
                </div>
                
                {/* Slider */}
                <div className="pl-6 md:pl-10 pb-8">
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-5 sleek-scrollbar pb-6 pr-6 md:pr-16">
                        {courses.map((course, i) => (
                            <CourseCard key={course.id || i} course={course} categorySlug={category.slug} />
                        ))}
                    </div>
                </div>

                {/* Prominent black button */}
                <div className="px-6 md:px-10">
                    <Link href={`/courses/${category.slug}`} className={`w-full md:w-auto md:px-12 py-3.5 md:py-4 bg-black text-white hover:bg-gray-800 transition-all font-bold uppercase tracking-wider md:tracking-widest text-[10px] sm:text-[11px] md:text-sm shadow-sm flex items-center justify-center md:inline-flex gap-2 md:gap-3 whitespace-nowrap ${manrope.className}`}>
                        Explore All {category.title} <ArrowRight size={14} className="shrink-0" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default async function TestHomePage() {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch categories
  const categoriesRes = await payload.find({
    collection: 'categories',
    sort: 'rank',
    limit: 10,
  });
  
  const categories = categoriesRes.docs;
  
  // Fetch courses for each category
  const categoriesWithCourses = await Promise.all(
    categories.map(async (category) => {
      const coursesRes = await payload.find({
        collection: 'coursenames',
        where: { category: { equals: category.id } },
        limit: 10,
      });
      return { ...category, courses: coursesRes.docs };
    })
  );

  // Fetch Reviews & Media
  const reviewsRes = await payload.find({ collection: 'reviews', sort: '-createdAt', limit: 20 });
  const reviews = reviewsRes.docs;

  let homepageMedia = null;
  try {
    homepageMedia = await payload.findGlobal({ slug: 'homepage-media' });
  } catch (error) {}

  return (
    <main className="min-h-screen bg-background text-text overflow-x-hidden w-full max-w-[100vw]">
      <Hero media={homepageMedia} />
      <Programs media={homepageMedia} />
      
      {/* NEW ARCHITECTURE: Soft Gray Background with Massive Floating Cards */}
      <div className="bg-[#f8f9fa] py-16 md:py-24 flex flex-col gap-12 md:gap-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-4">
            <h2 className={`text-4xl md:text-5xl font-bold uppercase tracking-tighter ${cinzel.className}`}>Explore Programs</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        {categoriesWithCourses.map(category => (
          category.courses.length > 0 && (
            <Variant15CategoryCard 
              key={category.id} 
              category={category} 
              courses={category.courses} 
            />
          )
        ))}
      </div>

      <AboutMaster media={homepageMedia} />
      <ReviewCarousel reviews={reviews} />
      <Training media={homepageMedia} />
    </main>
  );
}
