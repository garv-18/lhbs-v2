"use client";

import { Cinzel, Manrope } from "next/font/google";
import TextureBackground from "../components/TextureBackground";
import { CheckCircle2, ArrowRight, Star, Crown } from "lucide-react";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function JoinUs() {
    const handleJoin = (program) => {
        const text = `*New Enrollment Request*%0A%0AI am interested in joining the *${program}*.%0APlease guide me through the admission process.`;
        window.open(`https://api.whatsapp.com/send?phone=919713600085&text=${text}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-4">
            <TextureBackground />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${cinzel.className}`}>
                        JOIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8295E] to-[#FD5D2F]">US</span>
                    </h1>
                    <p className={`text-gray-400 text-lg max-w-2xl mx-auto ${manrope.className}`}>
                        Choose your path to mastery. Select the program that fits your goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Expert Program Card */}
                    <div className="glass-card rounded-3xl overflow-hidden relative group flex flex-col" data-aos="fade-right">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8295E] opacity-10 blur-[80px] rounded-full group-hover:opacity-20 transition-opacity"></div>

                        <div className="p-10 flex-grow">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8295E] to-[#FD5D2F] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(200,41,94,0.3)]">
                                <Star className="text-white" size={32} />
                            </div>

                            <h2 className={`text-3xl font-bold mb-4 ${cinzel.className}`}>
                                Martial Arts Expert Program 2.0
                            </h2>
                            <p className={`text-gray-400 mb-8 leading-relaxed ${manrope.className}`}>
                                A comprehensive one-year professional course designed to transform you from a beginner to an expert. Master the fundamentals, advanced techniques, and the philosophy of martial arts.
                            </p>

                            <div className={`text-3xl font-bold text-[#FD5D2F] mb-6 ${cinzel.className}`}>
                                ₹2,36,000
                            </div>

                            <div className="space-y-4 mb-10">
                                {[
                                    "12 Months Duration",
                                    "Basic to Advanced Level",
                                    "Professional Certification",
                                    "Personalized Mentorship",
                                    "Access to Exclusive Community"
                                ].map((feature, i) => (
                                    <div key={i} className={`flex items-center gap-3 text-gray-300 ${manrope.className}`}>
                                        <CheckCircle2 className="text-[#FD5D2F] flex-shrink-0" size={20} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 pt-0 mt-auto">
                            <button
                                onClick={() => handleJoin("Martial Arts Expert Program 2.0")}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                <span>Join Now</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* VIP Training Card */}
                    <div className="glass-card rounded-3xl overflow-hidden relative group flex flex-col border-white/10" data-aos="fade-left">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-5 blur-[80px] rounded-full group-hover:opacity-15 transition-opacity"></div>

                        <div className="p-10 flex-grow">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                                <Crown className="text-black" size={32} />
                            </div>

                            <h2 className={`text-3xl font-bold mb-4 text-[#FFD700] ${cinzel.className}`}>
                                VIP Training
                            </h2>
                            <p className={`text-gray-400 mb-8 leading-relaxed ${manrope.className}`}>
                                Exclusive, one-on-one training for those who demand the absolute best. Tailored specifically to your goals, schedule, and learning style. Experience the pinnacle of martial arts education.
                            </p>

                            <div className={`text-3xl font-bold text-[#FFD700] mb-6 ${cinzel.className}`}>
                                ₹2,36,000
                            </div>

                            <div className="space-y-4 mb-10">
                                {[
                                    "1-on-1 Personalized Coaching",
                                    "Flexible Scheduling",
                                    "Direct Access to Grandmaster",
                                    "Customized Curriculum",
                                    "Priority Support"
                                ].map((feature, i) => (
                                    <div key={i} className={`flex items-center gap-3 text-gray-300 ${manrope.className}`}>
                                        <CheckCircle2 className="text-[#FFD700] flex-shrink-0" size={20} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 pt-0 mt-auto">
                            <button
                                onClick={() => handleJoin("VIP Training")}
                                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest"
                            >
                                <span>Join VIP Now</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                    <div className="glass-card p-8 rounded-2xl">
                        <h3 className={`text-xl font-bold mb-4 ${cinzel.className}`}>Follow Us</h3>
                        <div className="flex justify-center md:justify-start gap-6">
                            {/* Social Icons Placeholder - using text for now or Lucide icons if available */}
                            <a href="#" className="text-gray-400 hover:text-[#FD5D2F] transition-colors">YouTube</a>
                            <a href="#" className="text-gray-400 hover:text-[#FD5D2F] transition-colors">Instagram</a>
                            <a href="#" className="text-gray-400 hover:text-[#FD5D2F] transition-colors">Facebook</a>
                        </div>
                    </div>
                    <div className="glass-card p-8 rounded-2xl">
                        <h3 className={`text-xl font-bold mb-4 ${cinzel.className}`}>Address</h3>
                        <p className={`text-gray-400 ${manrope.className}`}>
                            Martial Arts School<br />
                            Indore, Madhya Pradesh, Bharat (452018)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
