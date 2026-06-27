"use client";

import { Cinzel, Manrope } from "next/font/google";
import CourseImage from "../components/CourseImage";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

// Dummy Data
const sampleCourses = [
    { title: "SNAKE STYLE KUNG-FU", description: "Be elusive. Be deadly. Master the art of the viper...", price: 47500, image: "https://ik.imagekit.io/lhbs/snake-style%20.png" },
    { title: "TIGER STYLE KUNG-FU", description: "Unleash the beast within. Tear through defenses with...", price: 47500, image: "https://ik.imagekit.io/lhbs/tiger-style.png" },
    { title: "DRAGON STYLE KUNG-FU", description: "Harness the power of the dragon. Command respect and...", price: 47500, image: "https://ik.imagekit.io/lhbs/eagle-style.png" },
    { title: "MANTIS STYLE KUNG-FU", description: "Precision and speed. Strike before they even know...", price: 47500, image: "https://ik.imagekit.io/lhbs/kung-fu.png" },
];

const category = { title: "EXPERT PROGRAM", slug: "expert-program", description: "Explore our top-rated expert programs" };

// Reusable Card Component (Our Finalized Design)
const CourseCard = ({ course, isMobile = false }) => (
    <div className={`${isMobile ? 'w-[165px]' : 'min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px]'} shrink-0 snap-start bg-white border border-gray-200 rounded-none overflow-hidden flex flex-col shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all group`}>
        <div className="aspect-square w-full bg-gray-900 relative overflow-hidden">
            <CourseImage src={course.image} alt={course.title} className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
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
                        {course.price.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    </div>
);

// Layout Wrapper to show Desktop and Mobile side-by-side
const PreviewLayout = ({ title, description, children }) => (
    <div className="mb-32 border-b border-gray-200 pb-16">
        <div className="mb-8 max-w-4xl">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-500">{description}</p>
        </div>
        <div className="flex flex-col xl:flex-row gap-12 items-start">
            {/* Desktop Preview */}
            <div className="flex-1 w-full bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-400 flex items-center gap-2">
                    <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div><div className="w-2.5 h-2.5 rounded-full bg-green-400"></div></div>
                    Desktop (1024px+)
                </div>
                <div className="w-full relative overflow-hidden bg-gray-50/50">
                    {/* Render Children with isMobile=false context */}
                    {children({ isMobile: false })}
                </div>
            </div>

            {/* Mobile Preview */}
            <div className="w-[375px] shrink-0 bg-white border-[8px] border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-50"></div>
                <div className="h-[800px] w-full overflow-y-auto overflow-x-hidden bg-gray-50/50 relative">
                    {/* Render Children with isMobile=true context */}
                    {children({ isMobile: true })}
                </div>
            </div>
        </div>
    </div>
);


// --- VARIANTS ---

// Variant 1: Current/Default (Clean E-Commerce)
const Variant1 = ({ isMobile }) => (
    <div className="py-12 bg-white">
        <div className={`${isMobile ? 'px-4 mb-6' : 'max-w-7xl mx-auto px-8 mb-10 flex items-end justify-between'}`}>
            <div>
                <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-black uppercase tracking-tight ${cinzel.className}`}>{category.title}</h2>
                <p className={`text-gray-500 mt-2 ${isMobile ? 'text-sm' : 'text-base'} ${manrope.className}`}>{category.description}</p>
            </div>
            {!isMobile && (
                <div className="flex gap-4">
                    <button className="px-6 py-2 border border-gray-200 hover:bg-gray-50 font-medium text-sm transition-all shadow-sm">View All</button>
                    <div className="flex gap-2">
                        <button className="p-2 border border-gray-200 hover:bg-gray-50 shadow-sm"><ChevronLeft size={20} /></button>
                        <button className="p-2 border border-gray-200 hover:bg-gray-50 shadow-sm"><ChevronRight size={20} /></button>
                    </div>
                </div>
            )}
        </div>
        
        <div className={`flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 sleek-scrollbar ${isMobile ? 'pl-4 pr-4' : 'px-8 max-w-7xl mx-auto'}`}>
            {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
        </div>

        {isMobile && (
            <div className="px-4 mt-2">
                <button className="w-full py-4 border border-gray-200 bg-white font-medium text-sm shadow-sm">View All {category.title}</button>
            </div>
        )}
    </div>
);

// Variant 2: The Editorial / Apple Style (Side-by-side on desktop, stacked on mobile)
const Variant2 = ({ isMobile }) => (
    <div className="py-16 bg-[#f5f5f7]">
        <div className={`${isMobile ? 'flex flex-col' : 'max-w-7xl mx-auto px-8 flex gap-12 items-center'}`}>
            
            {/* Text Section */}
            <div className={`${isMobile ? 'px-4 mb-8 text-center' : 'w-1/3 shrink-0 pr-8'}`}>
                <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold text-black uppercase tracking-tighter leading-none mb-4 ${cinzel.className}`}>
                    {category.title}
                </h2>
                <p className={`text-gray-500 mb-8 leading-relaxed ${isMobile ? 'text-sm' : 'text-lg'} ${manrope.className}`}>
                    {category.description}. Elevate your skills with elite coaching and proven methodologies.
                </p>
                <button className={`bg-black text-white px-8 py-3.5 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors ${isMobile ? 'w-full' : ''} ${manrope.className}`}>
                    View Full Program
                </button>
            </div>

            {/* Cards Section */}
            <div className={`${isMobile ? 'w-full' : 'w-2/3 overflow-hidden relative'}`}>
                <div className={`flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 sleek-scrollbar ${isMobile ? 'pl-4 pr-4' : 'pr-8'}`}>
                    {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
                </div>
            </div>
        </div>
    </div>
);

// Variant 3: The Brutalist Dojo (Dark Mode)
const Variant3 = ({ isMobile }) => (
    <div className="py-16 bg-[#0a0a0a] text-white border-y border-gray-800">
        <div className={`${isMobile ? 'px-4 mb-8' : 'max-w-7xl mx-auto px-8 mb-12 flex justify-between items-end border-b border-gray-800 pb-6'}`}>
            <div>
                <div className="w-12 h-1 bg-red-600 mb-4"></div>
                <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold text-white uppercase tracking-tight ${cinzel.className}`}>{category.title}</h2>
                <p className={`text-gray-400 mt-3 ${isMobile ? 'text-sm' : 'text-base'} ${manrope.className}`}>{category.description}</p>
            </div>
            
            {!isMobile && (
                <Link href="#" className="flex items-center gap-2 text-white hover:text-red-500 transition-colors font-bold uppercase tracking-wider text-sm group">
                    View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            )}
        </div>
        
        <div className={`flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 sleek-scrollbar-dark ${isMobile ? 'pl-4 pr-4' : 'px-8 max-w-7xl mx-auto'}`}>
            {/* The cards are still white based on our design, providing crazy high contrast against the black background */}
            {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
            {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
        </div>

        {isMobile && (
            <div className="px-4 mt-4">
                <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-wider text-xs border border-white hover:bg-gray-200 transition-colors">
                    View All Programs
                </button>
            </div>
        )}

        <style dangerouslySetInnerHTML={{__html: `
            .sleek-scrollbar-dark::-webkit-scrollbar { height: 4px; }
            .sleek-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
            .sleek-scrollbar-dark::-webkit-scrollbar-thumb { background: #333; border-radius: 0; }
            .sleek-scrollbar-dark::-webkit-scrollbar-thumb:hover { background: #555; }
        `}} />
    </div>
);

// Variant 4: The Elevated Minimalist (Floating Cards, Clean Typography)
const Variant4 = ({ isMobile }) => (
    <div className="py-20 bg-white relative overflow-hidden">
        {/* Abstract Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>

        <div className={`${isMobile ? 'px-4 text-center mb-10' : 'max-w-7xl mx-auto px-8 mb-16 text-center'}`}>
            <span className={`text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block ${manrope.className}`}>Featured Collection</span>
            <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold text-black uppercase tracking-tight mb-4 ${cinzel.className}`}>{category.title}</h2>
            <p className={`text-gray-500 max-w-2xl mx-auto ${isMobile ? 'text-sm' : 'text-lg'} ${manrope.className}`}>{category.description}</p>
        </div>
        
        <div className={`relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 sleek-scrollbar ${isMobile ? 'pl-8 pr-8' : 'px-8 max-w-7xl mx-auto'}`}>
            {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
        </div>

        <div className={`text-center mt-4 ${isMobile ? 'px-4' : ''}`}>
            <button className={`inline-flex items-center justify-center gap-2 border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all font-bold uppercase tracking-widest text-xs ${manrope.className}`}>
                Explore All Courses <ArrowRight size={14} />
            </button>
        </div>
    </div>
);

// Variant 5: The Full-Width Editorial (Mixing V2 and V4)
const Variant5 = ({ isMobile }) => (
    <div className="py-20 bg-white">
        <div className={`${isMobile ? 'px-4 mb-8' : 'max-w-7xl mx-auto px-8 mb-12 flex items-end justify-between'}`}>
            {/* Editorial Intro (Left Aligned) */}
            <div className="max-w-3xl">
                <span className={`text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block ${manrope.className}`}>Category Profile</span>
                <h2 className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-bold text-black uppercase tracking-tighter leading-none mb-4 ${cinzel.className}`}>
                    {category.title}
                </h2>
                <p className={`text-gray-500 leading-relaxed ${isMobile ? 'text-sm' : 'text-lg'} ${manrope.className}`}>
                    {category.description}. Elevate your skills with elite coaching and proven methodologies. Discover the path that aligns with your ultimate goals.
                </p>
            </div>

            {/* Desktop Sleek Link on the right */}
            {!isMobile && (
                <button className={`shrink-0 inline-flex items-center justify-center gap-2 border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all font-bold uppercase tracking-widest text-xs ${manrope.className}`}>
                    Explore Full Program <ArrowRight size={14} />
                </button>
            )}
        </div>
        
        {/* Full Width Slider for Maximum Priority */}
        <div className={`flex overflow-x-auto snap-x snap-mandatory gap-6 pb-10 sleek-scrollbar ${isMobile ? 'pl-4 pr-4' : 'px-8 max-w-7xl mx-auto'}`}>
            {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
            {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
        </div>

        {/* Mobile Sleek Link at the bottom */}
        {isMobile && (
            <div className="px-4 mt-2">
                <button className={`w-full flex items-center justify-center gap-2 py-4 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all font-bold uppercase tracking-widest text-xs ${manrope.className}`}>
                    Explore Full Program <ArrowRight size={14} />
                </button>
            </div>
        )}
    </div>
);

// Variant 6: The Enclosed Collection (Solving Detachment via Enclosure & Proximity)
const Variant6 = ({ isMobile }) => (
    <div className="py-12 bg-white">
        {/* The Enclosure: A soft gray box that holds everything together */}
        <div className={`bg-[#f8f9fa] border border-gray-200 rounded-3xl ${isMobile ? 'mx-4 py-8' : 'max-w-7xl mx-auto px-10 py-12'} shadow-sm relative overflow-hidden`}>
            
            {/* Tighter margin (mb-6 instead of mb-12) keeps text close to cards */}
            <div className={`mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 ${isMobile ? 'px-4 text-center' : ''}`}>
                <div className="max-w-2xl">
                    <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-black uppercase tracking-tight mb-2 ${cinzel.className}`}>
                        {category.title}
                    </h2>
                    <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'} ${manrope.className}`}>
                        Elevate your skills with elite coaching and proven methodologies. Discover the path that aligns with your ultimate goals.
                    </p>
                </div>

                {!isMobile && (
                    <button className={`shrink-0 inline-flex items-center justify-center gap-2 border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all font-bold uppercase tracking-widest text-xs ${manrope.className}`}>
                        Explore Full Program <ArrowRight size={14} />
                    </button>
                )}
            </div>
            
            {/* Cards slider fits neatly inside the enclosure */}
            <div className={`flex overflow-x-auto snap-x snap-mandatory gap-4 sleek-scrollbar pb-4 ${isMobile ? 'px-4' : ''}`}>
                {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
            </div>

            {isMobile && (
                <div className="mt-6 px-4">
                    <button className={`w-full flex items-center justify-center gap-2 py-3 border border-gray-300 bg-white hover:bg-gray-50 transition-all font-bold uppercase tracking-widest text-[10px] ${manrope.className}`}>
                        Explore Full Program <ArrowRight size={14} />
                    </button>
                </div>
            )}
        </div>
    </div>
);

// Variant 7: The Tethered Rail (Solving Detachment via Connected Lines)
const Variant7 = ({ isMobile }) => (
    <div className="py-16 bg-white relative">
        <div className={`${isMobile ? 'px-4 mb-6' : 'max-w-7xl mx-auto px-8 mb-8'}`}>
            <div className="flex items-center gap-4">
                <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold text-black uppercase tracking-tighter shrink-0 ${cinzel.className}`}>
                    {category.title}
                </h2>
                {/* Visual tether line connecting the title directly to the edge of the screen */}
                <div className="flex-1 h-px bg-gray-200 mt-2"></div>
            </div>
            <p className={`text-gray-500 mt-3 max-w-2xl ${isMobile ? 'text-sm' : 'text-lg'} ${manrope.className}`}>
                {category.description}. Elevate your skills with elite coaching and proven methodologies.
            </p>
        </div>
        
        {/* Tighter padding-bottom on the slider */}
        <div className={`flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 sleek-scrollbar ${isMobile ? 'pl-4 pr-4' : 'px-8 max-w-7xl mx-auto'}`}>
            {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
            {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
        </div>

        {/* The View All link is tethered directly below the cards with a top border */}
        <div className={`${isMobile ? 'px-4' : 'max-w-7xl mx-auto px-8'}`}>
            <div className="border-t border-gray-200 pt-4 flex justify-end">
                <button className={`inline-flex items-center justify-center gap-2 text-gray-900 hover:text-gray-500 transition-all font-bold uppercase tracking-widest text-xs ${manrope.className}`}>
                    Explore Full Program <ArrowRight size={14} />
                </button>
            </div>
        </div>
    </div>
);

// Variant 8: The Structured Grid (Sharp Enclosure, Bottom Button, High Contrast)
const Variant8 = ({ isMobile }) => (
    <div className="py-16 bg-white">
        <div className={`border-2 border-black bg-white ${isMobile ? 'mx-4' : 'max-w-7xl mx-auto'} relative flex flex-col`}>
            
            {/* Header Block */}
            <div className={`p-6 md:p-10 border-b-2 border-black`}>
                <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-black mb-4 block ${manrope.className}`}>
                    Category Profile
                </span>
                <h2 className={`${isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-bold text-black uppercase tracking-tighter mb-4 ${cinzel.className}`}>
                    {category.title}
                </h2>
                <p className={`text-gray-600 max-w-3xl leading-relaxed ${isMobile ? 'text-sm' : 'text-base'} ${manrope.className}`}>
                    {category.description}. Elevate your skills with elite coaching and proven methodologies. Discover the path that aligns with your ultimate goals.
                </p>
            </div>
            
            {/* Cards Slider Block */}
            <div className={`flex overflow-x-auto snap-x snap-mandatory gap-6 pt-8 pb-10 sleek-scrollbar bg-gray-50 ${isMobile ? 'pl-6 pr-6' : 'px-10'}`}>
                {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
                {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
            </div>

            {/* Prominent Bottom Button Block */}
            <button className={`w-full py-5 md:py-6 border-t-2 border-black bg-black text-white hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 font-bold uppercase tracking-[0.15em] text-xs md:text-sm ${manrope.className}`}>
                Explore Full Program <ArrowRight size={16} />
            </button>
            
        </div>
    </div>
);

// Variant 9: The Refined Theme (Perfect Balance)
const Variant9 = ({ isMobile }) => (
    <div className="py-16 bg-white border-t border-gray-50">
        <div className={`${isMobile ? 'px-4 mb-6 text-center' : 'max-w-7xl mx-auto px-8 mb-8 text-center md:text-left'}`}>
            <div className={`max-w-3xl ${isMobile ? 'mx-auto' : ''}`}>
                <span className={`text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block ${manrope.className}`}>Category Profile</span>
                <h2 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold text-black uppercase tracking-tight mb-3 ${cinzel.className}`}>
                    {category.title}
                </h2>
                <p className={`text-gray-500 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'} ${manrope.className}`}>
                    {category.description}. Elevate your skills with elite coaching and proven methodologies. Discover the path that aligns with your ultimate goals.
                </p>
            </div>
        </div>
        
        {/* Cards are pulled tighter to the header (mb-8 instead of mb-16) to prevent detachment */}
        <div className={`flex overflow-x-auto snap-x snap-mandatory gap-5 pb-10 sleek-scrollbar ${isMobile ? 'pl-4 pr-4' : 'px-8 max-w-7xl mx-auto'}`}>
            {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
            {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
        </div>

        {/* Prominent but elegant bottom button, centered */}
        <div className={`text-center mt-2 ${isMobile ? 'px-4' : 'px-8'}`}>
            <button className={`w-full md:w-auto md:px-12 py-4 flex items-center justify-center gap-3 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all font-bold uppercase tracking-widest text-xs md:text-sm shadow-sm ${manrope.className}`}>
                Explore Full Program <ArrowRight size={16} />
            </button>
        </div>
    </div>
);

// Variant 10: The Integrated Slider (The Netflix/Spotify Pattern)
const Variant10 = ({ isMobile }) => (
    <div className="py-20 bg-white border-t border-gray-100">
        <div className={`flex overflow-x-auto snap-x snap-mandatory gap-4 sleek-scrollbar pb-8 ${isMobile ? 'pl-4 pr-4' : 'pl-8 pr-8 md:pl-[max(2rem,calc((100%-80rem)/2))]'}`}>
            
            {/* The First "Card" is the Category Profile itself. It exists INSIDE the slider track. */}
            <div className={`${isMobile ? 'w-[280px]' : 'w-[400px]'} shrink-0 snap-start bg-gray-50 border border-gray-200 flex flex-col justify-between p-6 md:p-10 shadow-sm relative overflow-hidden group`}>
                <div>
                    <div className="w-10 h-1 bg-black mb-6"></div>
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block ${manrope.className}`}>
                        Explore Category
                    </span>
                    <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-black uppercase tracking-tighter mb-4 ${cinzel.className}`}>
                        {category.title}
                    </h2>
                    <p className={`text-gray-500 leading-relaxed ${isMobile ? 'text-xs' : 'text-sm'} ${manrope.className}`}>
                        {category.description}. Elevate your skills with elite coaching and proven methodologies. Discover the path that aligns with your ultimate goals.
                    </p>
                </div>
                <div className="mt-8">
                    <button className={`w-full py-4 border border-black bg-white hover:bg-black hover:text-white transition-all font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-sm flex items-center justify-center gap-2 ${manrope.className}`}>
                        View All Programs <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* The Course Cards follow immediately after on the same exact track */}
            {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
            {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
            
            {/* Optional End Card for "View All" */}
            <div className={`${isMobile ? 'w-[165px]' : 'min-w-[320px] w-[320px]'} shrink-0 snap-start bg-white border border-gray-200 flex flex-col items-center justify-center p-6 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors`}>
                <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center mb-4">
                    <ArrowRight size={20} className="text-gray-400" />
                </div>
                <span className={`font-bold uppercase tracking-widest text-xs text-center ${manrope.className}`}>See All<br/>Courses</span>
            </div>
        </div>
    </div>
);

// Variant 11: The Overlapping Anchor (The MasterClass Pattern)
const Variant11 = ({ isMobile }) => (
    <div className="bg-white">
        {/* Top Dark Background Block */}
        <div className="bg-gray-900 pt-20 pb-32">
            <div className={`max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 ${isMobile ? 'px-4 text-center' : 'px-8'}`}>
                <div className={`max-w-2xl ${isMobile ? 'mx-auto' : ''}`}>
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block ${manrope.className}`}>
                        Curated Collection
                    </span>
                    <h2 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold text-white uppercase tracking-tighter mb-4 ${cinzel.className}`}>
                        {category.title}
                    </h2>
                    <p className={`text-gray-400 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'} ${manrope.className}`}>
                        {category.description}. Elevate your skills with elite coaching and proven methodologies.
                    </p>
                </div>
                
                {!isMobile && (
                    <button className={`shrink-0 inline-flex items-center justify-center gap-2 border-b-2 border-white text-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all font-bold uppercase tracking-widest text-xs ${manrope.className}`}>
                        Explore Full Program <ArrowRight size={14} />
                    </button>
                )}
            </div>
        </div>
        
        {/* Cards shifted UP (negative margin) so they physically overlap the background edge */}
        <div className="-mt-20 relative z-10 pb-20">
            <div className={`flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 sleek-scrollbar ${isMobile ? 'pl-4 pr-4' : 'px-8 max-w-7xl mx-auto'}`}>
                {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
                {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
            </div>

            {isMobile && (
                <div className="px-4 mt-2">
                    <button className={`w-full flex items-center justify-center gap-2 py-4 border border-gray-200 bg-white hover:bg-gray-50 transition-all font-bold uppercase tracking-widest text-xs ${manrope.className}`}>
                        Explore Full Program <ArrowRight size={14} />
                    </button>
                </div>
            )}
        </div>
    </div>
);

// Variant 12: The Locked Anchor Card (Variant 10 visuals, but zero scroll-away)
const Variant12 = ({ isMobile }) => (
    <div className="py-16 bg-white border-t border-gray-100 overflow-hidden relative">
        <div className={`relative ${isMobile ? '' : 'max-w-7xl mx-auto'}`}>
            
            {/* The Locked Anchor Card (Stays fixed on the left) */}
            <div className={`
                ${isMobile ? 'relative mb-6 mx-4 w-auto border-b-4 border-black pb-6' : 'absolute left-8 top-0 bottom-8 w-[320px] z-20 bg-white border border-gray-200 shadow-xl flex flex-col justify-between'}
                p-6
            `}>
                <div>
                    {!isMobile && <div className="w-10 h-1 bg-black mb-6"></div>}
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block ${manrope.className}`}>
                        Category Profile
                    </span>
                    <h2 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold text-black uppercase tracking-tighter mb-4 leading-none ${cinzel.className}`}>
                        {category.title}
                    </h2>
                    <p className={`text-gray-500 leading-relaxed ${isMobile ? 'text-sm' : 'text-sm'} ${manrope.className}`}>
                        {category.description}. Elevate your skills with elite coaching and proven methodologies.
                    </p>
                </div>
                
                {!isMobile && (
                    <div className="mt-8">
                        <button className={`w-full py-4 bg-black text-white hover:bg-gray-800 transition-all font-bold uppercase tracking-widest text-xs shadow-sm flex items-center justify-center gap-2 ${manrope.className}`}>
                            Explore Full Program <ArrowRight size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* The Scrolling Track (Padded on desktop to avoid the absolute card) */}
            <div className={`
                flex overflow-x-auto snap-x snap-mandatory gap-5 sleek-scrollbar pb-8 relative z-10
                ${isMobile ? 'px-4' : 'pl-[380px] pr-8'}
            `}>
                {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
                {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
            </div>

            {/* Mobile bottom button (since the anchor isn't fixed on mobile due to screen size) */}
            {isMobile && (
                <div className="px-4 mt-2">
                    <button className={`w-full py-4 bg-black text-white hover:bg-gray-800 transition-all font-bold uppercase tracking-widest text-xs shadow-sm flex items-center justify-center gap-2 ${manrope.className}`}>
                        Explore Full Program <ArrowRight size={14} />
                    </button>
                </div>
            )}
        </div>
    </div>
);

// Variant 13: The Subtle Locked Anchor (V12 but perfectly matched to the light/subtle theme)
const Variant13 = ({ isMobile }) => (
    <div className="py-16 bg-white border-t border-gray-50 overflow-hidden relative">
        <div className={`relative ${isMobile ? '' : 'max-w-7xl mx-auto'}`}>
            
            {/* The Locked Anchor Card (Stays fixed on the left, but uses subtle styling) */}
            <div className={`
                ${isMobile ? 'relative mb-6 mx-4 w-auto border-b border-gray-100 pb-6' : 'absolute left-8 top-0 bottom-8 w-[320px] z-20 bg-gray-50 border border-gray-100 rounded-3xl flex flex-col justify-between'}
                p-6 md:p-8
            `}>
                <div>
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block ${manrope.className}`}>
                        Category Profile
                    </span>
                    <h2 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold text-black uppercase tracking-tighter mb-4 leading-none ${cinzel.className}`}>
                        {category.title}
                    </h2>
                    <p className={`text-gray-500 leading-relaxed ${isMobile ? 'text-sm' : 'text-sm'} ${manrope.className}`}>
                        {category.description}. Elevate your skills with elite coaching and proven methodologies.
                    </p>
                </div>
                
                {!isMobile && (
                    <div className="mt-8">
                        <button className={`w-full py-4 bg-white border border-gray-200 text-black hover:bg-gray-100 hover:border-gray-300 transition-all font-bold uppercase tracking-widest text-xs shadow-sm flex items-center justify-center gap-2 rounded-xl ${manrope.className}`}>
                            Explore Full Program <ArrowRight size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* The Scrolling Track */}
            <div className={`
                flex overflow-x-auto snap-x snap-mandatory gap-5 sleek-scrollbar pb-8 relative z-10
                ${isMobile ? 'px-4' : 'pl-[380px] pr-8'}
            `}>
                {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
                {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
            </div>

            {isMobile && (
                <div className="px-4 mt-2">
                    <button className={`w-full py-4 bg-white border border-gray-200 text-black hover:bg-gray-50 transition-all font-bold uppercase tracking-widest text-xs shadow-sm flex items-center justify-center gap-2 rounded-xl ${manrope.className}`}>
                        Explore Full Program <ArrowRight size={14} />
                    </button>
                </div>
            )}
        </div>
    </div>
);

// Variant 14: The Subtle Overlap (V11 but perfectly matched to the light/subtle theme)
const Variant14 = ({ isMobile }) => (
    <div className="bg-white">
        {/* Top Subtle Background Block */}
        <div className="bg-[#f8f9fa] pt-20 pb-32 border-b border-gray-100">
            <div className={`max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 ${isMobile ? 'px-4 text-center' : 'px-8'}`}>
                <div className={`max-w-2xl ${isMobile ? 'mx-auto' : ''}`}>
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block ${manrope.className}`}>
                        Curated Collection
                    </span>
                    <h2 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold text-black uppercase tracking-tighter mb-4 ${cinzel.className}`}>
                        {category.title}
                    </h2>
                    <p className={`text-gray-500 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'} ${manrope.className}`}>
                        {category.description}. Elevate your skills with elite coaching and proven methodologies.
                    </p>
                </div>
                
                {!isMobile && (
                    <button className={`shrink-0 inline-flex items-center justify-center gap-2 border-b-2 border-gray-300 text-gray-900 pb-1 hover:text-black hover:border-black transition-all font-bold uppercase tracking-widest text-xs ${manrope.className}`}>
                        Explore Full Program <ArrowRight size={14} />
                    </button>
                )}
            </div>
        </div>
        
        {/* Cards shifted UP so they physically overlap the background edge */}
        <div className="-mt-20 relative z-10 pb-20">
            <div className={`flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 sleek-scrollbar ${isMobile ? 'pl-4 pr-4' : 'px-8 max-w-7xl mx-auto'}`}>
                {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
                {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
            </div>

            {isMobile && (
                <div className="px-4 mt-2">
                    <button className={`w-full flex items-center justify-center gap-2 py-4 border border-gray-200 bg-white hover:bg-gray-50 transition-all font-bold uppercase tracking-widest text-xs shadow-sm rounded-xl ${manrope.className}`}>
                        Explore Full Program <ArrowRight size={14} />
                    </button>
                </div>
            )}
        </div>
    </div>
);

// Variant 15: The Final Mix (V9 Base + V12 Button)
const Variant15 = ({ isMobile }) => (
    <div className="py-16 bg-white border-t border-gray-50">
        <div className={`${isMobile ? 'px-4' : 'max-w-7xl mx-auto px-8'}`}>
            <div className="relative">
                {/* Header (Left-aligned) */}
                <div className="mb-8">
                    <div className="max-w-3xl">
                        <span className={`text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block ${manrope.className}`}>Category Profile</span>
                        <h2 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold text-black uppercase tracking-tight mb-3 ${cinzel.className}`}>
                            {category.title}
                        </h2>
                        <p className={`text-gray-500 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'} ${manrope.className}`}>
                            {category.description}. Elevate your skills with elite coaching and proven methodologies. Discover the path that aligns with your ultimate goals.
                        </p>
                    </div>
                </div>
                
                {/* Slider */}
                <div className={`pb-8`}>
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 sleek-scrollbar pb-6 -mr-4 pr-4 md:-mr-8 md:pr-8">
                        {sampleCourses.map((c, i) => <CourseCard key={i} course={c} isMobile={isMobile} />)}
                        {sampleCourses.map((c, i) => <CourseCard key={i+4} course={c} isMobile={isMobile} />)}
                    </div>
                </div>

                {/* Prominent V12 black button */}
                <div>
                    <button className={`w-full md:w-auto md:px-12 py-3.5 md:py-4 bg-black text-white hover:bg-gray-800 transition-all font-bold uppercase tracking-wider md:tracking-widest text-[10px] sm:text-[11px] md:text-sm shadow-sm flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap ${manrope.className}`}>
                        Explore All {category.title} <ArrowRight size={14} className="shrink-0" />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default function TestSectionsPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8 pt-32">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl font-bold mb-4">Section Design Lab</h1>
                    <p className="text-xl text-gray-600">Evaluating different layouts for the category carousels. View desktop and mobile side-by-side to understand how the context shifts across breakpoints.</p>
                </div>

                <PreviewLayout 
                    title="1. Current/Default Setup" 
                    description="This is exactly how it's built right now. Standard title on top left, cards below, big border button at the bottom for mobile."
                >
                    {({ isMobile }) => <Variant1 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="2. The Editorial Split (Recommended)" 
                    description="On desktop, the text is locked to the left column creating an elegant editorial layout. On mobile, it stacks gracefully with central alignment. Very Apple/Premium."
                >
                    {({ isMobile }) => <Variant2 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="3. The Brutalist Dojo (High Contrast)" 
                    description="A pitch-black section background creates insane contrast with our sharp white cards. The red accent line gives it that disciplined, intense martial arts feel without being tacky."
                >
                    {({ isMobile }) => <Variant3 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="4. Elevated Minimalist" 
                    description="Centers the category title with a sub-eyebrow ('Featured Collection'). Removes the heavy 'View All' button in favor of a sleek, underlined text link for a highly sophisticated feel."
                >
                    {({ isMobile }) => <Variant4 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="5. The Full-Width Editorial (V2 + V4 Mix)" 
                    description="Takes the strong, informative intro column from V2 (large title, eyebrow, rich description) but keeps it anchored to the top left. This allows the course cards to stretch 100% full-width below it, giving them maximum visibility and priority. Uses the sleek V4 link style."
                >
                    {({ isMobile }) => <Variant5 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="6. The Enclosed Collection (Fixes Detachment)" 
                    description="Solves the 'floating in space' feeling by physically wrapping the Title, Cards, and Button inside a massive, soft-gray visual container. By tightening the margins (Law of Proximity) and wrapping them in a box (Law of Enclosure), the elements feel unmistakably bound together as a single unit."
                >
                    {({ isMobile }) => <Variant6 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="7. The Tethered Rail (Fixes Detachment)" 
                    description="Instead of a box, this variant uses connected lines. A horizontal line shoots out from the title, visually framing the top of the cards. The 'View All' button sits on a border directly underneath the cards, acting like a floor. The cards are now 'sandwiched' between the title and the button."
                >
                    {({ isMobile }) => <Variant7 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="8. The Structured Grid (Sharp Enclosure)" 
                    description="Takes the 'Enclosure' concept from Variant 6, but applies our disciplined Dojo Edge aesthetic. Removes all rounded corners and soft grays, replacing them with sharp 2px black borders and high contrast. The 'Explore Full Program' button acts as a massive, unmistakable footer for the entire section."
                >
                    {({ isMobile }) => <Variant8 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="9. The Refined Theme (Perfect Balance)" 
                    description="Returns to our actual theme colors (crisp whites, subtle gray borders) but tightens the margins so nothing feels detached. Features a strong left-aligned Category Profile intro (like V2), full-width priority cards (like V4), and a prominent, elegant button placed dead-center at the bottom where users naturally look after scrolling."
                >
                    {({ isMobile }) => <Variant9 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="10. The Integrated Slider (Netflix / Spotify Pattern)" 
                    description="The ultimate cure for detachment. The Category Title, Description, and Button are placed INSIDE the very first card of the slider. Because the context exists on the exact same physical scrolling rail as the courses, there is literally 0% detachment."
                >
                    {({ isMobile }) => <Variant10 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="11. The Overlapping Anchor (MasterClass Pattern)" 
                    description="Uses physical intersection to solve detachment. The title and context live in a massive dark block at the top. But instead of sitting below it, the course cards are shifted UP so they physically overlap the edge of the background. The intersection of the two layers visually proves they belong to the same block."
                >
                    {({ isMobile }) => <Variant11 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="12. The Locked Anchor Card" 
                    description="Fixes the major UX flaw of Variant 10. The Category intro is still styled like a card to prevent detachment, but on Desktop it is locked in place on the left. When you scroll horizontally, the course cards slide smoothly out from behind/next to the locked anchor card, so you NEVER lose the category context or the 'View All' button."
                >
                    {({ isMobile }) => <Variant12 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="13. The Subtle Locked Anchor" 
                    description="The exact same perfect UX as Variant 12, but completely refitted to match your subtle, light-themed aesthetic. No harsh black blocks or heavy borders. The anchor is a very soft gray card with an elegant white outline button."
                >
                    {({ isMobile }) => <Variant13 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="14. The Subtle Overlap" 
                    description="The exact same Overlap mechanic as Variant 11 to solve detachment, but replaces the massive dark background with a very subtle, soft #f8f9fa gray block that perfectly matches our theme while still creating the overlapping illusion."
                >
                    {({ isMobile }) => <Variant14 isMobile={isMobile} />}
                </PreviewLayout>

                <PreviewLayout 
                    title="15. The Final Mix (V9 Base + V12 Button)" 
                    description="Takes the perfect balance of Variant 9, upgrades the bottom button to the sharp black style from Variant 12, and left-aligns everything for a clean, highly structured reading line."
                >
                    {({ isMobile }) => <Variant15 isMobile={isMobile} />}
                </PreviewLayout>
            </div>
        </div>
    );
}
