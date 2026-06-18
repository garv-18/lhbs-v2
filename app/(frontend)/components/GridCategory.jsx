"use client";

import { Cinzel, Manrope } from "next/font/google";
import { Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function GridCategory({ category, courses = [] }) {
    if (courses.length === 0) return null;

    return (
        <div className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
                <span className={`block text-[#FD5D2F] text-sm font-bold tracking-[0.2em] uppercase mb-2 ${manrope.className}`}>
                    {category.targetPage === '/courses' ? 'Explore Our Courses' : 'Explore Our Products'}
                </span>
                <h2 className={`text-4xl md:text-5xl font-bold text-white leading-tight ${cinzel.className}`}>
                    {category.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8295E] to-[#FD5D2F]">{category.title.split(' ').slice(1).join(' ')}</span>
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course, index) => (
                        <div
                            key={course.slug || index}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#FD5D2F]/50 transition-all duration-500 group relative flex flex-col"
                        >
                            {/* Image Area */}
                            <div className="h-48 relative overflow-hidden bg-black/50">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-[#FD5D2F]/20 transition-colors">
                                    <Zap size={48} strokeWidth={1} />
                                </div>
                                {(course.image?.url || course.image) && (
                                    <Image
                                        src={course.image?.url || course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 relative z-0"
                                    />
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="mb-auto">
                                    <span className={`block text-[#FD5D2F] text-[10px] font-bold tracking-widest uppercase mb-1 ${manrope.className}`}>
                                        {course.slogan}
                                    </span>
                                    <h3 className={`text-xl font-bold text-white mb-2 ${cinzel.className}`}>
                                        {course.title}
                                    </h3>
                                    <p className={`text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 ${manrope.className}`}>
                                        {course.description}
                                    </p>
                                </div>

                                <Link href={`/coursename/${course.slug}`}>
                                    <button className="w-full py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-[#FD5D2F] hover:border-[#FD5D2F] transition-all duration-300">
                                        Explore
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link href={`/courses/${category.slug}`}>
                        <button className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#FD5D2F] hover:border-[#FD5D2F] text-white transition-all duration-300 text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2">
                            View All {category.title}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
