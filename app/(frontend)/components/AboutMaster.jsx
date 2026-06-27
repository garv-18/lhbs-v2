"use client";
import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";
import { ArrowRight, Trophy, Globe, Users, Shield, Youtube } from "lucide-react";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

export default function AboutMaster() {
    return (
        <section className="py-24 relative overflow-hidden bg-white text-text">
            {/* Ambient background effect */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left Content - Bio */}
                <motion.div 
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="space-y-8"
                >
                    <div>
                        <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                            <Youtube size={18} /> @pramodgoswami
                        </p>
                        <h2 className={`text-4xl md:text-6xl font-extrabold text-text tracking-tight leading-tight mb-4 ${cinzel.className}`}>
                            Master Pramod <br />
                            <span className="text-primary">
                                Goswami
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg font-medium">
                            International Martial Arts Coach | Founder of LHBS
                        </p>
                    </div>

                    <div className="text-gray-600 space-y-4 leading-relaxed text-lg">
                        <p>
                            <strong className="text-text">Train Like a Warrior. Live Like a Legend.</strong>
                        </p>
                        <p>
                            "Here, we don’t follow trends — we create them. From traditional to tactical, cinematic to real-world combat – this is where every warrior begins."
                        </p>
                        <p>
                            Training warriors since 2013, Master Pramod has cultivated thousands of global success stories with a singular mission: to empower 1 crore martial artists globally through his academy and massive YouTube following.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/50 transition-colors shadow-sm">
                            <Youtube className="text-[#FF0000] mb-3" size={28} />
                            <h4 className="text-text font-bold text-xl mb-1">YouTube</h4>
                            <p className="text-sm text-gray-500">Join our massive digital dojo</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/50 transition-colors shadow-sm">
                            <Users className="text-primary mb-3" size={28} />
                            <h4 className="text-text font-bold text-xl mb-1">1 Crore</h4>
                            <p className="text-sm text-gray-500">Mission Target</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/50 transition-colors shadow-sm">
                            <Shield className="text-primary mb-3" size={28} />
                            <h4 className="text-text font-bold text-xl mb-1">Real-world</h4>
                            <p className="text-sm text-gray-500">Practical Self Defense</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/50 transition-colors shadow-sm">
                            <Trophy className="text-[#FFD700] mb-3" size={28} />
                            <h4 className="text-text font-bold text-xl mb-1">Certified</h4>
                            <p className="text-sm text-gray-500">International Coach</p>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4">
                        <a 
                            href="https://youtube.com/@pramodgoswami" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-6 py-3.5 rounded-full font-bold hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]"
                        >
                            <Youtube size={20} /> Subscribe on YouTube
                        </a>
                    </div>
                </motion.div>

                {/* Right Content - Visual */}
                <motion.div 
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
                    <img
                        src="/photo.jpg"
                        alt="Master Pramod Goswami"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    <div className="absolute bottom-8 left-8 right-8 z-20">
                        <p className={`text-2xl text-white italic ${cinzel.className}`}>
                            "Live Healthy. Be Safe. Be Legendary."
                        </p>
                        <div className="w-16 h-1 bg-primary mt-5 rounded-full"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
