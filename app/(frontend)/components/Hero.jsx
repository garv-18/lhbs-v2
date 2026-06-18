import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative w-full pt-32 pb-20 px-4 flex flex-col items-center justify-center bg-background text-text">
            
            {/* Content */}
            <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center gap-6 mb-16">
                <span
                    className="text-primary bg-primary/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                    data-aos="fade-down"
                >
                    Discipline • Honor • Strength
                </span>

                <h1
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    Master the <br />
                    <span className="text-primary">
                        Art of War
                    </span>
                </h1>

                <p
                    className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    Join the elite. Train with masters. Transform your mind and body through the ancient traditions of martial arts.
                </p>

                <Link href="/courses">
                    <button
                        className="mt-8 group relative px-8 py-4 bg-primary text-white rounded-xl font-semibold overflow-hidden transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <span className="relative flex items-center gap-3 text-sm">
                            Explore Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </Link>
            </div>

            {/* Video Container */}
            <div 
                className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative"
                data-aos="fade-up"
                data-aos-delay="800"
            >
                <div className="aspect-video w-full relative">
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
            </div>
        </section>
    );
}
