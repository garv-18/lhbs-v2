import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            
            {/* Cinematic Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                {/* Gradient transition to the light background below */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://ik.imagekit.io/lhbs/Video%20Project.mp4?tr=f-auto" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center gap-6 px-4 mt-16">
                <span
                    className="text-primary bg-primary/20 backdrop-blur-sm border border-primary/30 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-white"
                    data-aos="fade-down"
                >
                    Discipline • Honor • Strength
                </span>

                <h1
                    className={`text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight text-white ${cinzel.className}`}
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    Master the <br />
                    <span className="text-primary drop-shadow-[0_0_15px_rgba(255,90,95,0.5)]">
                        Art of War
                    </span>
                </h1>

                <p
                    className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed font-light"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    Join the elite. Train with masters. Transform your mind and body through the ancient traditions of martial arts.
                </p>

                <Link href="/courses">
                    <button
                        className="mt-8 group relative px-8 py-4 bg-primary text-white rounded-full font-semibold overflow-hidden transition-all hover:bg-primary-hover shadow-[0_0_20px_rgba(255,90,95,0.4)] hover:shadow-[0_0_30px_rgba(255,90,95,0.6)]"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <span className="relative flex items-center gap-3 text-sm uppercase tracking-wider">
                            Explore Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary z-20">
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
            </div>
        </section>
    );
}
