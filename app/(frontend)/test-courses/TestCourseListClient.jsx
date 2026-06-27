"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cinzel, Manrope } from "next/font/google";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CourseImage from "../components/CourseImage";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

const CourseCardV15 = ({ course, categorySlug }) => (
    <Link href={`/courses/${categorySlug}/${course.slug}`} className="min-w-[42vw] w-[42vw] sm:min-w-[280px] sm:w-[280px] md:min-w-[320px] md:w-[320px] shrink-0 snap-start bg-white border border-gray-200 rounded-none overflow-hidden flex flex-col shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all group">
        <div className="aspect-square w-full bg-gray-50 relative overflow-hidden">
            <CourseImage src={course.image?.url || course.image} alt={course.title} className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-red-500 transition-colors"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
        </div>
        <div className="p-3 md:p-5 flex-1 flex flex-col bg-white">
            <h3 className={`text-[12px] sm:text-[14px] md:text-[16px] font-bold text-black leading-tight uppercase tracking-tight mb-2 line-clamp-2 ${cinzel.className}`}>
                {course.title}
            </h3>
            <p className={`text-[10px] sm:text-[12px] md:text-[13px] text-gray-500 leading-snug line-clamp-2 mb-3 md:mb-4 ${manrope.className}`}>
                {course.description}
            </p>
            <div className="mt-auto border-t border-gray-100 pt-2 md:pt-3 flex flex-col">
                <span className={`text-[8px] sm:text-[9px] md:text-[11px] text-gray-400 font-medium mb-0.5 md:mb-1 ${manrope.className}`}>Total Price</span>
                <div className={`flex items-baseline text-[#0f172a] ${manrope.className}`}>
                    <span className="text-[9px] md:text-[12px] font-bold mr-[2px]">₹</span>
                    <span className="text-[14px] sm:text-[16px] md:text-[20px] font-black tracking-tight leading-none">
                        {course.price ? course.price.toLocaleString() : '2,999'}
                    </span>
                </div>
            </div>
        </div>
    </Link>
);

const Variant15Section = ({ category, courses }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350; // Approximate card width + gap
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    return (
        <div className="py-12 md:py-20 bg-white border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="px-4 md:px-8 mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                    <div className="max-w-3xl">
                        <h2 className={`text-3xl md:text-5xl font-bold text-black uppercase tracking-tight mb-2 ${cinzel.className}`}>
                            {category.title}
                        </h2>
                        <p className={`text-gray-500 text-xs md:text-sm ${manrope.className}`}>
                            Explore our top-rated {category.title.toLowerCase()}
                        </p>
                    </div>
                    
                    {/* Desktop: Top Right Controls */}
                    <div className="hidden md:flex items-center gap-4 shrink-0 mb-1">
                        <div className="flex gap-2">
                            <button onClick={() => scroll("left")} className="p-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-black transition-all shadow-sm group">
                                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                            <button onClick={() => scroll("right")} className="p-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-black transition-all shadow-sm group">
                                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Horizontal Slider */}
                <div className="px-2 md:px-8 pb-8">
                    <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-2 md:gap-5 sleek-scrollbar pb-4 pr-2 md:pr-8">
                        {courses.map((course, i) => (
                            <CourseCardV15 key={course.id || i} course={course} categorySlug={category.slug} />
                        ))}
                    </div>
                </div>

                {/* Bottom Button */}
                <div className="px-4 md:px-8">
                    <Link href={`/courses/${category.slug}`} className={`w-full md:w-auto md:px-12 py-4 bg-black text-white hover:bg-gray-800 transition-all font-bold uppercase tracking-wider text-[11px] md:text-sm shadow-sm flex items-center justify-center md:inline-flex gap-2 whitespace-nowrap ${manrope.className}`}>
                        Explore All {category.title} <ArrowRight size={14} className="shrink-0" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function TestCourseListClient({ categories }) {
  const [navbarHeight, setNavbarHeight] = useState(68);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updateHeight = () => {
      const nav = document.getElementById('navbar');
      if (nav) {
        setNavbarHeight(nav.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const isSearching = searchQuery.trim().length > 0;

  // Flattened search results
  let allSearchMatches = [];
  if (isSearching) {
    const lowerQuery = searchQuery.toLowerCase();
    categories.forEach(category => {
      if (category.courses) {
        const matches = category.courses.filter(course => 
          course.title.toLowerCase().includes(lowerQuery) || 
          course.description?.toLowerCase().includes(lowerQuery)
        );
        matches.forEach(m => allSearchMatches.push({ ...m, categorySlug: category.slug }));
      }
    });
  }

  return (
    <div className="w-full bg-white pb-20">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-6">
        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for courses, martial arts, fitness..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-5 py-3.5 pr-12 bg-white border border-gray-200 rounded-2xl md:rounded-full shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base md:px-8 md:py-4 md:text-lg ${manrope.className}`}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Quick-Jump Category Menu */}
      {!isSearching && (
        <div className="max-w-7xl mx-auto px-4 pb-8 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 md:gap-4 md:justify-center md:min-w-0 pr-4">
            {categories.filter(c => c.courses && c.courses.length > 0).map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  const el = document.getElementById(`category-${category.slug}`);
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className={`px-4 py-1.5 md:px-6 md:py-2.5 rounded-full border border-gray-200 bg-white hover:bg-black hover:text-white hover:border-black transition-all text-[10px] md:text-sm font-bold uppercase tracking-wide md:tracking-wider text-black whitespace-nowrap shadow-sm ${manrope.className}`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Flat Search Results omitted for brevity in test page, but we will render the normal categories */}
      
      {/* Normal Category Variant 15 Flat Sections */}
      {!isSearching && categories.map((category) => {
        if (!category.courses || category.courses.length === 0) return null;

        return (
          <div key={category.id} id={`category-${category.slug}`} className="scroll-mt-24">
            <Variant15Section category={category} courses={category.courses} />
          </div>
        );
      })}
    </div>
  );
}
