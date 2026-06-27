"use client";
import { motion } from "framer-motion";
import { Cinzel, Manrope } from "next/font/google";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import CourseImage from "./CourseImage";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500"] });

const courses = [
    {
        title: "Muay Thai",
        description: "Learn one of the world’s deadliest martial arts to protect yourself with confidence and precision.",
        image: "https://ik.imagekit.io/lhbs/muay-thai.png?updatedAt=1751458719255",
        link: "/courses/master-program/muaythai"
    },
    {
        title: "Kung-fu",
        description: "Master traditional Kung-fu techniques, tricks, and styles from Bharat’s top coach—right from your phone.",
        image: "https://ik.imagekit.io/lhbs/kung-fu.png?updatedAt=1751458720326",
        link: "/courses/master-program/kungfu"
    },
    {
        title: "Krav Maga",
        description: "Train in real-life combat techniques to fight off attackers using proven science and psychology.",
        image: "https://ik.imagekit.io/lhbs/krav-maga.png?updatedAt=1751458718291",
        link: "/courses/master-program/kravmaga"
    },
    {
        title: "Capoeira",
        description: "Blend rhythm, movement, and defense with this dynamic Brazilian martial art—taught step by step.",
        image: "https://ik.imagekit.io/lhbs/capoeira.png?updatedAt=1751458719046",
        link: "/courses/master-program/capoeira"
    },
    {
        title: "Tai-chi",
        description: "Balance body and mind while gaining powerful internal strength with calming Tai-chi techniques.",
        image: "https://ik.imagekit.io/lhbs/tai-chi.png?updatedAt=1751458718173",
        link: "/courses/master-program/taichi"
    },
    {
        title: "Muscle Building",
        description: "Build lean, powerful muscle at home. A 25-day no-gym challenge designed for rapid, visible results.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
        link: "/courses/master-program/musclesbuilding"
    },
    {
        title: "Diet & Nutrition",
        description: "Reboot your body with a 25-day detox, home remedies, and nutrition plans that suit every lifestyle.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
        link: "/courses/master-program/dietandnutrition"
    },
    {
        title: "Street Survival",
        description: "Master the art of street survival. Learn quick, effective techniques to neutralize threats in real-world scenarios.",
        image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop",
        link: "/courses/master-program/roadfight"
    },
    {
        title: "Tiger Style Kung-fu",
        description: "Unleash your inner strength and emotional control with this fierce and disciplined animal style.",
        image: "https://ik.imagekit.io/lhbs/tiger-style.png?updatedAt=1751458718375",
        link: "/courses/master-program/tigerstylekungfu"
    },
    {
        title: "Eagle Style Kung-fu",
        description: "Focused, fast, and brutal—train to react quickly and powerfully in emergency situations.",
        image: "https://ik.imagekit.io/lhbs/eagle-style.png?updatedAt=1751458716362",
        link: "/courses/master-program/eaglestylekungfu"
    },
    {
        title: "Snake Style Kung-fu",
        description: "Perfect your agility and precision to counter group attacks with snake-like speed and strategy.",
        image: "https://ik.imagekit.io/lhbs/snake-style%20.png?updatedAt=1751458718560",
        link: "/courses/master-program/snakestylekungfu"
    },
    {
        title: "Height Growth Formula",
        description: "Unlock your growth potential naturally. A proven, organic 90-day method to increase height without medication.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
        link: "/courses/master-program/heightgrowformula"
    },
    {
        title: "Weight Loss Formula",
        description: "Shed 15% of your body weight in just 25 days—guaranteed—through customized diet and training.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
        link: "/courses/master-program/weightlossformula"
    },
    {
        title: "Vision Restoration",
        description: "Revitalize your vision naturally. A 25-day program to reduce strain and restore eye health—perfect for the digital age.",
        image: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?q=80&w=2009&auto=format&fit=crop",
        link: "/courses/master-program/eyehealingformula"
    },
    {
        title: "Spirituality Guide",
        description: "Discover inner peace and alignment of mind, body, and nature through a 25-day spiritual transformation.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop",
        link: "/courses/master-program/spirituality"
    },
];

export default function CoursesGrid() {
    return (
        <section id="courses" className="relative py-32 px-4 max-w-7xl mx-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className={`text-4xl md:text-6xl text-center mb-20 text-text font-extrabold tracking-tight ${cinzel.className}`}
            >
                CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF9F1C]">PATH</span>
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {courses.map((course, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: Math.min(index * 0.05, 0.3) }}
                    >
                    <Link
                        href={course.link}
                        className="group relative h-full bg-white border border-gray-200 rounded-none hover:shadow-lg transition-all duration-300 flex flex-col shadow-[0_4px_10px_rgba(0,0,0,0.03)] overflow-hidden"
                    >
                        <div className="aspect-square w-full relative overflow-hidden bg-gray-900">
                            <CourseImage
                                src={course.image}
                                alt={course.title}
                                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            
                            {/* Favorite Icon */}
                            <FavoriteButton course={{...course, slug: course.link?.split('/').pop(), categorySlug: course.link?.split('/')[1]}} />
                        </div>

                        {/* Content Area */}
                        <div className="p-4 md:p-6 flex-1 flex flex-col bg-white">
                            <h3 className={`text-base md:text-xl font-bold text-black leading-tight uppercase tracking-tight mb-2 line-clamp-2 ${cinzel.className}`}>
                                {course.title}
                            </h3>
                            <p className={`text-xs md:text-sm text-gray-500 leading-snug line-clamp-2 mb-4 ${manrope.className}`}>
                                {course.description}
                            </p>
                            
                            <div className="mt-auto border-t border-gray-100 pt-3 flex flex-col">
                                <span className={`text-[10px] md:text-xs text-gray-400 font-medium mb-1 ${manrope.className}`}>Total Price</span>
                                <div className={`flex items-baseline text-[#0f172a] ${manrope.className}`}>
                                    <span className="text-[11px] md:text-[13px] font-bold mr-[2px]">₹</span>
                                    <span className="text-[18px] md:text-[24px] font-black tracking-tight leading-none">
                                        {course.price ? course.price.toLocaleString() : '2,999'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
