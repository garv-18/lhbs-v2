"use client";

import { useRef } from "react";
import { Cinzel, Manrope } from "next/font/google";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { regularCourses } from "../utils/courseData";
import Link from "next/link";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function RegularProgram() {
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

    return (
        <div className="py-20 relative bg-black/20">
            <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
                <div>
                    <span className={`block text-[#FD5D2F] text-sm font-bold tracking-[0.2em] uppercase mb-2 ${manrope.className}`}>
                        Our Core
                    </span>
                    <h2 className={`text-4xl md:text-5xl font-bold text-white leading-tight ${cinzel.className}`}>
                        Martial Arts <span className="text-white">Program</span>
                    </h2>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-4">
                    <Link href="/courses/programs">
                        <button className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#FD5D2F] hover:border-[#FD5D2F] text-white transition-all duration-300 text-sm font-bold uppercase tracking-wider">
                            View All
                        </button>
                    </Link>

                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#FD5D2F] hover:border-[#FD5D2F] text-white transition-all duration-300 group flex"
                        >
                            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#FD5D2F] hover:border-[#FD5D2F] text-white transition-all duration-300 group flex"
                        >
                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
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
                {regularCourses.map((course, index) => (
                    <div
                        key={index}
                        className="min-w-[85vw] md:min-w-[340px] snap-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#FD5D2F]/50 transition-all duration-500 group relative flex flex-col"
                    >
                        {/* Image Area */}
                        <div className="h-64 relative overflow-hidden bg-black/50">
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>

                            {/* Placeholder Icon/Image if real image fails/is placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-[#FD5D2F]/20 transition-colors">
                                <Zap size={64} strokeWidth={1} />
                            </div>

                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-0" />
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-auto">
                                <span className={`block text-[#FD5D2F] text-xs font-bold tracking-widest uppercase mb-2 ${manrope.className}`}>
                                    {course.slogan}
                                </span>
                                <h3 className={`text-2xl font-bold text-white mb-4 ${cinzel.className}`}>
                                    {course.title}
                                </h3>

                                <p className={`text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 ${manrope.className}`}>
                                    {course.description}
                                </p>
                            </div>

                            <Link href={`/coursename/${course.slug}`}>
                                <button className="w-full py-3 rounded-xl bg-white/10 border border-white/10 text-white font-bold hover:bg-[#FD5D2F] hover:border-[#FD5D2F] transition-all duration-300">
                                    Explore Course
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}

                {/* Padding for end of scroll */}
                <div className="min-w-[20px] md:min-w-[calc((100vw-1280px)/2)] shrink-0"></div>
            </div>

            {/* Mobile Controls */}
            <div className="px-4 md:hidden flex items-center justify-between gap-4 mt-[-20px] mb-10">
                <button
                    onClick={() => scroll("left")}
                    className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#FD5D2F] hover:border-[#FD5D2F] text-white transition-all duration-300 flex-shrink-0"
                >
                    <ChevronLeft size={24} />
                </button>

                <Link href="/courses/programs" className="flex-1">
                    <button className="w-full py-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#FD5D2F] hover:border-[#FD5D2F] text-white transition-all duration-300 text-sm font-bold uppercase tracking-wider">
                        View All
                    </button>
                </Link>

                <button
                    onClick={() => scroll("right")}
                    className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#FD5D2F] hover:border-[#FD5D2F] text-white transition-all duration-300 flex-shrink-0"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
