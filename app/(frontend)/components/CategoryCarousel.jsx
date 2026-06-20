"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Cinzel, Manrope } from "next/font/google";

import FavoriteButton from "./FavoriteButton";
import CourseImage from "./CourseImage";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function CategoryCarousel({ category, courses = [] }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350; // Card width approx
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    if (courses.length === 0) return null;

    return (
        <div className="py-20 relative bg-background border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 mb-10 flex flex-col md:flex-row items-end justify-between gap-6">
                <div>
                    <h2 className={`text-3xl md:text-4xl font-bold text-text leading-tight ${cinzel.className}`}>
                        {category.title}
                    </h2>
                    <p className={`text-gray-500 mt-2 text-sm ${manrope.className}`}>
                        Explore our top-rated {category.title.toLowerCase()}s
                    </p>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-4">
                    <Link href={`/courses/${category.slug}`}>
                        <button className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-text transition-all duration-300 text-sm font-semibold shadow-sm">
                            View All
                        </button>
                    </Link>

                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="p-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-text transition-all duration-300 group flex shadow-sm"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-text transition-all duration-300 group flex shadow-sm"
                        >
                            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 md:gap-8 px-4 md:px-8 lg:px-[calc((100vw-1280px)/2)] pb-12 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {courses.map((course, index) => (
                    <Link
                        href={`/courses/${category.slug}/${course.slug}`}
                        key={course.slug || index}
                        className="min-w-[85vw] md:min-w-[320px] max-w-[320px] snap-center bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group flex flex-col shadow-sm rounded-2xl"
                    >
                        {/* Image Area - Taller aspect ratio */}
                        <div className="aspect-square w-full relative overflow-hidden bg-gray-50">
                            <CourseImage
                                src={course.image?.url || course.image}
                                alt={course.title}
                                className="group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            {/* Favorite Icon */}
                            <FavoriteButton course={{...course, categorySlug: category.slug}} />
                        </div>

                        {/* Content Area */}
                        <div className="p-4 md:p-6 flex-1 flex flex-col bg-white border-t border-gray-50">
                            <h3 className={`text-base sm:text-lg md:text-2xl text-text mb-3 md:mb-4 ${cinzel.className} line-clamp-2`}>
                                {course.title}
                            </h3>
                            
                            <div className="flex justify-between items-end mt-auto gap-2 md:gap-4">
                                <div className="flex-1">
                                    <p className={`text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 font-medium ${manrope.className}`}>
                                        {course.description}
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <span className={`text-base sm:text-xl md:text-2xl text-text tracking-tight ${cinzel.className}`}>
                                        {course.price ? `Rs. ${course.price.toLocaleString()}` : 'Rs. 2,999'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                <div className="min-w-[20px] md:min-w-[calc((100vw-1280px)/2)] shrink-0"></div>
            </div>

            {/* Mobile Controls */}
            <div className="px-4 md:hidden flex items-center justify-between gap-4 mt-[-20px] mb-4">
                <button
                    onClick={() => scroll("left")}
                    className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-text transition-all duration-300 flex-shrink-0 shadow-sm"
                >
                    <ChevronLeft size={20} />
                </button>

                <Link href={`/courses/${category.slug}`} className="flex-1">
                    <button className="w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-text transition-all duration-300 text-sm font-semibold shadow-sm">
                        View All
                    </button>
                </Link>

                <button
                    onClick={() => scroll("right")}
                    className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-text transition-all duration-300 flex-shrink-0 shadow-sm"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
