import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Cinzel, Manrope } from 'next/font/google';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500"] });

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0a0a0a] z-10"></div>
                <Image
                    src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop"
                    alt="Martial Arts Master"
                    fill
                    className="object-cover animate-slow-pan opacity-60"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6">
                <p
                    className={`text-[#FD5D2F] text-sm md:text-base tracking-[0.3em] uppercase ${manrope.className}`}
                    data-aos="fade-down"
                >
                    Discipline • Honor • Strength
                </p>

                <h1
                    className={`text-4xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter leading-none ${cinzel.className}`}
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    MASTER THE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                        ART OF WAR
                    </span>
                </h1>

                <p
                    className={`text-gray-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed ${manrope.className}`}
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    Join the elite. Train with masters. Transform your mind and body through the ancient traditions of martial arts.
                </p>

                <Link href="/courses">
                    <button
                        className="mt-8 group relative px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full overflow-hidden transition-all hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_30px_rgba(253,93,47,0.3)]"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#C8295E] to-[#FD5D2F] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        <span className={`relative flex items-center gap-3 text-white tracking-widest uppercase text-sm ${manrope.className}`}>
                            Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            </div>
        </section>
    );
}
