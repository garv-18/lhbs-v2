"use client";

import { useRef } from "react";
import Link from "next/link";
import { Cinzel, Manrope } from "next/font/google";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CourseImage from "./CourseImage";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

const CourseCardV15 = ({ course, categorySlug }) => (
    <Link href={`/courses/${categorySlug}/${course.slug}`} className="min-w-[44vw] w-[44vw] sm:min-w-[280px] sm:w-[280px] md:min-w-[320px] md:w-[320px] shrink-0 snap-start bg-white border border-gray-200 rounded-none overflow-hidden flex flex-col shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all group">
        <div className="aspect-square w-full bg-gray-50 relative overflow-hidden">
            <CourseImage src={course.image?.url || course.image} alt={course.title} className="object-cover group-hover:scale-105 transition-transform duration-700" />
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

export default function CategoryCarousel({ category, courses = [] }) {
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

    if (courses.length === 0) return null;

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
}
