"use client";

import { Cinzel, Manrope } from "next/font/google";
import { Zap } from "lucide-react";
import { masterCourses } from "../../utils/courseData";
import Link from "next/link";
import TextureBackground from "../../components/TextureBackground";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function MasterProgramPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FD5D2F] selection:text-white pt-32 pb-20">
            <TextureBackground />

            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-down">
                    <span className={`block text-[#FD5D2F] text-sm font-bold tracking-[0.2em] uppercase mb-4 ${manrope.className}`}>
                        Exclusive Collection
                    </span>
                    <h1 className={`text-4xl md:text-6xl font-bold text-white leading-tight ${cinzel.className}`}>
                        Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8295E] to-[#FD5D2F]">Program</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in duration-500">
                    {masterCourses.map((course, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#FD5D2F]/50 transition-all duration-500 group relative flex flex-col hover:-translate-y-2 w-[85%] md:w-full mx-auto"
                        >
                            <div className="h-[185px] md:h-64 relative overflow-hidden bg-black/50">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-[#FD5D2F]/20 transition-colors">
                                    <Zap size={64} strokeWidth={1} />
                                </div>
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-0" />
                            </div>

                            <div className="p-4 md:p-6 flex-1 flex flex-col">
                                <div className="mb-auto">
                                    <span className={`block text-[#FD5D2F] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 ${manrope.className}`}>
                                        {course.slogan}
                                    </span>
                                    <h3 className={`text-lg md:text-2xl font-bold text-white mb-4 ${cinzel.className}`}>
                                        {course.title}
                                    </h3>
                                    <p className={`text-gray-400 text-[10px] md:text-sm leading-relaxed mb-6 line-clamp-3 ${manrope.className}`}>
                                        {course.description}
                                    </p>
                                </div>
                                <Link href={`/coursename/${course.slug}`}>
                                    <button className="w-full py-2 md:py-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm md:text-base font-bold hover:bg-[#FD5D2F] hover:border-[#FD5D2F] transition-all duration-300">
                                        Explore Course
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
