"use client";

import { Manrope, Cinzel } from "next/font/google";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

const REVIEWS = [
    {
        name: "Kaminee Gupta",
        text: "I see a lot of positive changes in my child after joining this class... Sir is very hardworking and give personal attention to every child... and most important thing is that my child is very happy to go to his class...",
        rating: 5,
        initial: "K"
    },
    {
        name: "Vishesh Joshi Place",
        text: "Best martial arts school in Indore... If you want to learn self defense and want to be fit you should join here... The nature of guru ji (Pramod Sir) is very polite and kind.",
        rating: 5,
        initial: "V"
    },
    {
        name: "Trisha Kakati",
        text: "For several days, I had been searching for a dedicated martial arts trainer... I am truly grateful that we finally found Pramod Sir. From the very first day, the coach demonstrated remarkable sincerity.",
        rating: 5,
        initial: "T"
    },
    {
        name: "Ashutosh Kaushik",
        text: "Recently i joined a physical event in Martial Art School. Shri Pramod Goswami (sir) taught us... usage of self defense technique and their implementation. Thanks sir to make us a Warrior.",
        rating: 5,
        initial: "A"
    },
    {
        name: "Manju",
        text: "I am writing this feedback to give my thanks to Pramod Goswami sir for teaching my son self defense... Pramod sir is a well educated International Martial Arts trainer.",
        rating: 5,
        initial: "M"
    },
    {
        name: "Priya Sharma",
        text: "The environment is very disciplined yet encouraging. Master Pramod knows exactly how to push limits while ensuring safety. Highly recommended for women's self-defense!",
        rating: 5,
        initial: "P"
    }
];

// Duplicate reviews to create seamless infinite loop efficiently
const INFINITE_REVIEWS = [...REVIEWS, ...REVIEWS];

const ReviewCard = ({ review }) => (
    <div
        className="shrink-0 w-[350px] md:w-[400px] bg-white border border-gray-200 p-8 rounded-xl hover:border-gray-300 transition-colors duration-300 flex flex-col justify-between gap-6 mx-4 group select-none min-h-[320px] shadow-sm hover:shadow-md"
    >
        <div className="relative">
            <p className="text-gray-600 leading-relaxed text-[15px]">
                "{review.text}"
            </p>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-2">
            <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                    {review.initial}
                </div>
            </div>
            <div>
                <h4 className={`text-text font-bold tracking-wide text-sm ${cinzel.className}`}>
                    {review.name}
                </h4>
            </div>
        </div>
    </div>
);

export default function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden bg-gray-50">
            {/* Background Gradients - Subtle */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 mb-20">
                <div className="text-center" data-aos="fade-down">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white mb-6 shadow-sm">
                        <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                            Wall of Love
                        </p>
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-extrabold text-text tracking-tighter ${cinzel.className}`}>
                        WHAT STUDENTS <span className="text-primary">SAY</span>
                    </h2>
                </div>
            </div>

            {/* Infinite Slider */}
            <div className="relative w-full flex overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>

                <motion.div
                    className="flex"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 50, // Slower for readability
                            ease: "linear",
                        },
                    }}
                >
                    {INFINITE_REVIEWS.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
