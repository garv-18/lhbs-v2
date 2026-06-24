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
        <div className="py-10 md:py-16 relative bg-background border-b border-gray-100">
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
                className="flex overflow-x-auto gap-4 md:gap-8 px-4 md:px-8 lg:px-[calc((100vw-1280px)/2)] pb-8 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {courses.map((course, index) => {
                    const hasDiscount = course.originalPrice && course.originalPrice > course.price;
                    const discountPercentage = hasDiscount
                        ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
                        : 0;

                    return (
                        <Link
                            href={`/courses/${category.slug}/${course.slug}`}
                            key={course.slug || index}
                            className="min-w-[42vw] max-w-[42vw] sm:min-w-[280px] sm:max-w-[280px] md:min-w-[320px] md:max-w-[320px] snap-center bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group flex flex-col shadow-sm rounded-2xl"
                        >
                            {/* Image Area */}
                            <div className="aspect-square w-full relative overflow-hidden bg-gray-50 rounded-t-2xl">
                                <CourseImage
                                    src={course.image?.url || course.image}
                                    alt={course.title}
                                    className="group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Favorite Icon */}
                                <FavoriteButton course={{ ...course, categorySlug: category.slug }} />
                            </div>

                            {/* Content Area */}
                            <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col bg-white border-t border-gray-50 rounded-b-2xl">
                                <h3 className={`text-sm sm:text-base md:text-2xl text-text mb-2 md:mb-4 ${cinzel.className} line-clamp-2`}>
                                    {course.title}
                                </h3>

                                <div className="flex justify-between items-end mt-auto gap-2 md:gap-4">
                                    <div className="flex-1">
                                        <p className={`text-gray-600 text-[10px] sm:text-xs md:text-sm leading-relaxed line-clamp-2 font-medium ${manrope.className}`}>
                                            {course.description}
                                        </p>
                                    </div>
                                    <div className="shrink-0 flex flex-col items-end justify-end">
                                        {hasDiscount && (
                                            <div className="flex items-center gap-1 mb-0.5">
                                                <span className="text-gray-400 line-through text-[10px] md:text-xs">
                                                    Rs. {course.originalPrice.toLocaleString()}
                                                </span>
                                                <span className="bg-green-100 text-green-800 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                                                    {discountPercentage}% OFF
                                                </span>
                                            </div>
                                        )}
                                        <span className={`text-sm sm:text-base md:text-xl text-text tracking-tight ${cinzel.className}`}>
                                            {course.price ? `Rs. ${course.price.toLocaleString()}` : 'Rs. 2,999'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                <div className="min-w-[20px] md:min-w-[calc((100vw-1280px)/2)] shrink-0"></div>
            </div>

            {/* Large View All Button */}
            <div className="px-4 max-w-7xl mx-auto mt-4">
                <Link href={`/courses/${category.slug}`} className="block w-full">
                    <button className="w-full py-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-text transition-all duration-300 text-sm md:text-base font-bold shadow-sm uppercase tracking-wider">
                        View All {category.title}
                    </button>
                </Link>
            </div>
        </div>
    );
}
