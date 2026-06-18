import { Cinzel, Manrope } from "next/font/google";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

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

            <h2
                className={`text-4xl md:text-6xl text-center mb-20 text-text font-extrabold tracking-tight ${cinzel.className}`}
                data-aos="fade-up"
            >
                CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF9F1C]">PATH</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                    <Link
                        href={course.link}
                        key={index}
                        className="group relative bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col shadow-sm"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                    >
                        <div className="h-[360px] w-full relative overflow-hidden bg-gray-50">
                            {course.image && (
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative z-0"
                                />
                            )}
                            
                            {/* Favorite Icon */}
                            <FavoriteButton course={{...course, slug: course.link?.split('/').pop(), categorySlug: course.link?.split('/')[1]}} />
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex-1 flex flex-col bg-white border-t border-gray-50">
                            <h3 className={`text-2xl text-text mb-4 ${cinzel.className} line-clamp-1`}>
                                {course.title}
                            </h3>
                            
                            <div className="flex justify-between items-end mt-auto gap-4">
                                <div className="flex-1">
                                    <p className={`text-gray-600 text-sm leading-relaxed line-clamp-2 font-medium ${manrope.className}`}>
                                        {course.description}
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <span className={`text-2xl text-text tracking-tight ${cinzel.className}`}>
                                        {course.price ? `₹${course.price}` : '₹2999'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
