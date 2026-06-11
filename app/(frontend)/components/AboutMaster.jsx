import { Manrope, Cinzel } from "next/font/google";
import Link from "next/link";
import { ArrowRight, Trophy, Globe, Users, Shield } from "lucide-react";

const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

export default function AboutMaster() {
    return (
        <section className="py-24 relative overflow-hidden bg-black">
            {/* Ambient background effect */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FD5D2F]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content - Bio */}
                <div className="space-y-8" data-aos="fade-right">
                    <div>
                        <p className={`text-[#FD5D2F] text-sm tracking-[0.2em] uppercase mb-3 ${manrope.className}`}>
                            The Founder
                        </p>
                        <h2 className={`text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none mb-4 ${cinzel.className}`}>
                            MASTER <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">
                                PRAMOD GOSWAMI
                            </span>
                        </h2>
                        <p className={`text-white/60 text-lg ${manrope.className}`}>
                            International Martial Arts Coach | Founder – MasterPramod.com
                        </p>
                    </div>

                    <div className={`text-gray-400 space-y-4 leading-relaxed ${manrope.className}`}>
                        <p>
                            <strong className="text-white">Train Like a Warrior. Live Like a Legend.</strong>
                        </p>
                        <p>
                            "Here, we don’t follow trends — we create them. From traditional to tactical, cinematic to real-world combat – this is where every warrior begins."
                        </p>
                        <p>
                            Training warriors since 2013, Master Pramod has cultivated thousands of global success stories with a singular mission: to empower 1 crore martial artists.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <Globe className="text-[#FD5D2F] mb-2" size={24} />
                            <h4 className={`text-white font-bold text-xl ${cinzel.className}`}>Global</h4>
                            <p className="text-sm text-gray-400">Success Stories</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <Users className="text-[#C8295E] mb-2" size={24} />
                            <h4 className={`text-white font-bold text-xl ${cinzel.className}`}>1 Crore</h4>
                            <p className="text-sm text-gray-400">Mission Target</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <Shield className="text-[#FD5D2F] mb-2" size={24} />
                            <h4 className={`text-white font-bold text-xl ${cinzel.className}`}>Real-world</h4>
                            <p className="text-sm text-gray-400">Self Defense</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <Trophy className="text-[#C8295E] mb-2" size={24} />
                            <h4 className={`text-white font-bold text-xl ${cinzel.className}`}>Certified</h4>
                            <p className="text-sm text-gray-400">International Coach</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Link href="https://www.youtube.com/@pramodgoswami/about" target="_blank">
                            <button className="group flex items-center gap-3 text-white hover:text-[#FD5D2F] transition-colors">
                                <span className={`tracking-widest uppercase text-sm ${manrope.className}`}>
                                    View Full Profile
                                </span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Content - Visual/Image place holder for now since we don't have a specific image asset, 
            using a nice styling to represent the master's presence or video if available later. 
            For now, using a stylized placeholder with the gradient. */}
                <div className="relative h-[600px] w-full rounded-2xl overflow-hidden" data-aos="fade-left">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                    <img
                        src="/photo.jpg"
                        alt="Master Pramod Goswami"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />

                    <div className="absolute bottom-8 left-8 right-8 z-20">
                        <p className={`text-xl text-white italic font-light ${manrope.className}`}>
                            "Live Healthy. Be Safe. Be Legendary."
                        </p>
                        <div className="w-12 h-1 bg-[#FD5D2F] mt-4"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
