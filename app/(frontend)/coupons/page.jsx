"use client";

import { Cinzel, Manrope } from "next/font/google";
import TextureBackground from "../components/TextureBackground";
import { Gift, ArrowRight, Sparkles } from "lucide-react";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

const offers = [
    "Free Camp",
    "Free Workshop",
    "Free Counselling",
    "Free Quiz",
    "Free Test",
    "Free Webinar",
    "Five Days Course",
    "Free Event Pass",
    "Free Warrior's Test",
    "Collaboration on YT",
    "Personal Guidance",
    "A coffee with NinjaPramod sir",
    "Maximum Discount for Martial Arts Diploma"
];

export default function Coupons() {
    const handleClaim = (offer) => {
        const text = `*Offer Claim Request*%0A%0AI am interested in the *${offer}*.%0APlease provide me with the details/coupon code.`;
        window.open(`https://api.whatsapp.com/send?phone=919713600085&text=${text}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-4">
            <TextureBackground />

            <div className="max-w-4xl mx-auto text-center">
                {/* Header */}
                <div className="mb-16" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Sparkles size={16} className="text-[#FD5D2F]" />
                        <span className={`text-sm tracking-widest uppercase ${manrope.className}`}>Exclusive Rewards</span>
                    </div>
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${cinzel.className}`}>
                        SELECT YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8295E] to-[#FD5D2F]">REWARD</span>
                    </h1>
                    <p className={`text-gray-400 text-lg max-w-2xl mx-auto ${manrope.className}`}>
                        Feel free to select any offer and claim your code via WhatsApp.
                    </p>
                </div>

                {/* Offers List */}
                <div className="space-y-4">
                    {offers.map((offer, index) => (
                        <div
                            key={index}
                            className="group"
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                        >
                            <button
                                onClick={() => handleClaim(offer)}
                                className="w-full max-w-2xl mx-auto relative overflow-hidden rounded-xl p-[1px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(200,41,94,0.2)]"
                            >
                                {/* Gradient Border */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#C8295E] to-[#FD5D2F] opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                {/* Button Content */}
                                <div className="relative bg-[#0a0a0a] rounded-xl px-8 py-6 flex items-center justify-between group-hover:bg-[#111] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FD5D2F] group-hover:bg-[#FD5D2F] group-hover:text-white transition-all duration-300">
                                            <Gift size={20} />
                                        </div>
                                        <span className={`text-lg md:text-xl font-medium text-gray-200 group-hover:text-white transition-colors ${manrope.className}`}>
                                            {offer}
                                        </span>
                                    </div>

                                    <ArrowRight className="text-gray-600 group-hover:text-[#FD5D2F] transition-colors transform group-hover:translate-x-1 duration-300" size={24} />
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
