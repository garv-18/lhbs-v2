"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
                    <h2 className="text-3xl md:text-4xl font-bold text-text leading-tight">
                        {category.title}
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
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
                className="flex overflow-x-auto gap-4 md:gap-6 px-4 md:px-8 lg:px-[calc((100vw-1280px)/2)] pb-12 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {courses.map((course, index) => (
                    <div
                        key={course.slug || index}
                        className="min-w-[85vw] md:min-w-[320px] max-w-[320px] snap-center bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group relative flex flex-col shadow-sm"
                    >
                        {/* Image Area */}
                        <div className="h-56 relative overflow-hidden bg-gray-100">
                            {(course.image?.url || course.image) && (
                                <Image
                                    src={course.image?.url || course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 relative z-0"
                                />
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="mb-auto">
                                <span className="block text-primary text-xs font-semibold tracking-wide uppercase mb-1.5">
                                    {course.slogan}
                                </span>
                                <h3 className="text-xl font-bold text-text mb-2 line-clamp-1">
                                    {course.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {course.description}
                                </p>
                            </div>

                            <Link href={`/coursename/${course.slug}`}>
                                <button className="w-full py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors duration-300 text-sm">
                                    View Course
                                </button>
                            </Link>
                        </div>
                    </div>
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
