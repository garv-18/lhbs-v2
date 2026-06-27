"use client";

import { Cinzel, Manrope } from "next/font/google";
import { Ticket, ArrowRight, Sparkles, Tag } from "lucide-react";
import { motion } from "framer-motion";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700", "800"] });

const offers = [
    { title: "Free Camp", code: "CAMP100" },
    { title: "Free Workshop", code: "WORK100" },
    { title: "Free Counselling", code: "COUNSEL100" },
    { title: "Free Quiz", code: "QUIZ100" },
    { title: "Free Test", code: "TEST100" },
    { title: "Free Webinar", code: "WEBINAR100" },
    { title: "Five Days Course", code: "FIVEDAYS" },
    { title: "Free Event Pass", code: "EVENT100" },
    { title: "Free Warrior's Test", code: "WARRIOR100" },
    { title: "Collaboration on YT", code: "COLLABYT" },
    { title: "Personal Guidance", code: "GUIDE100" },
    { title: "Maximum Discount for Martial Arts Diploma", code: "DIPLOMAMAX" }
];

export default function Coupons() {
    const handleClaim = (offer) => {
        const text = `*Offer Claim Request*%0A%0AI am interested in the *${offer.title}*.%0APlease provide me with the details/coupon code.`;
        window.open(`https://api.whatsapp.com/send?phone=919713600085&text=${text}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-background text-text pt-32 pb-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                
                {/* Background Accents */}
                <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6 shadow-sm">
                        <Sparkles size={16} className="text-primary" />
                        <span className={`text-sm tracking-widest uppercase font-extrabold text-primary ${manrope.className}`}>Exclusive Rewards</span>
                    </div>
                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight ${cinzel.className}`}>
                        SELECT YOUR <span className="text-primary">REWARD</span>
                    </h1>
                    <p className={`text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-medium ${manrope.className}`}>
                        Choose from our exclusive selection of passes, discounts, and free events. Claim your code instantly via WhatsApp.
                    </p>
                </motion.div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 80, damping: 20, delay: (index % 3) * 0.1 }}
                            className="group relative bg-white border border-gray-200 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex overflow-hidden cursor-pointer"
                            onClick={() => handleClaim(offer)}
                        >
                            {/* Left Side (Offer details) */}
                            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative bg-white z-10">
                                {/* Watermark Icon */}
                                <div className="absolute top-6 right-6 p-4 opacity-5 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform group-hover:rotate-12 group-hover:scale-110">
                                    <Tag size={100} />
                                </div>
                                
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 shadow-inner">
                                    <Ticket size={24} className="group-hover:rotate-12 transition-transform duration-500" />
                                </div>
                                <h3 className={`text-xl md:text-2xl font-extrabold text-text mb-3 pr-4 leading-snug line-clamp-2 ${cinzel.className}`}>
                                    {offer.title}
                                </h3>
                                <p className={`text-xs font-bold text-gray-400 tracking-widest uppercase mt-auto ${manrope.className}`}>
                                    CODE: <span className="text-gray-800 bg-gray-100 px-2 py-1 rounded-md ml-1">{offer.code}</span>
                                </p>
                            </div>

                            {/* Ticket Divider Cutout */}
                            <div className="relative w-[1px] bg-transparent shrink-0 z-20">
                                {/* Dotted Line */}
                                <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-[2px] border-l-2 border-dashed border-gray-200"></div>
                                {/* Top and Bottom Semi-circle Cutouts */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-background rounded-full shadow-inner border-b border-gray-100"></div>
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-background rounded-full shadow-inner border-t border-gray-100"></div>
                            </div>

                            {/* Right Side (CTA Rip-off tab) */}
                            <div className="w-20 md:w-24 bg-gray-50 group-hover:bg-primary transition-colors duration-500 flex flex-col items-center justify-center gap-4 relative z-10">
                                <span className={`text-sm font-extrabold tracking-[0.3em] uppercase text-gray-400 group-hover:text-white [writing-mode:vertical-rl] rotate-180 transition-colors duration-500 ${manrope.className}`}>
                                    Claim Now
                                </span>
                                <div className="w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-500">
                                    <ArrowRight className="text-gray-400 group-hover:text-white transition-colors duration-500 transform group-hover:translate-x-1" size={18} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
