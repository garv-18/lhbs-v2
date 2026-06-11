import { Cinzel, Manrope } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500"] });

const trainingItems = [
    {
        title: "CULTURES",
        subtitle: "Global Disciplines",
        image: "https://ik.imagekit.io/lhbs/cultures.png?updatedAt=1751533730599",
        desc: "Master styles from across the world, blending tradition with modern combat.",
    },
    {
        title: "ANIMALS",
        subtitle: "Primal Techniques",
        image: "https://ik.imagekit.io/lhbs/animals.png?updatedAt=1751533730596",
        desc: "Embody the spirit of the Tiger, Crane, and Snake in your movement.",
    },
    {
        title: "WEAPONS",
        subtitle: "Extension of Self",
        image: "https://ik.imagekit.io/lhbs/weapons.png?updatedAt=1751533730786",
        desc: "Learn to wield traditional weaponry with precision and grace.",
    },
];

export default function Training() {
    return (
        <section id="training" className="relative py-32 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 border-b border-white/10 pb-8">
                <h2
                    className={`text-4xl md:text-7xl text-white font-bold tracking-tight ${cinzel.className}`}
                    data-aos="fade-right"
                >
                    WHAT WE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5045E3] to-[#C8295E]">TRAIN</span>
                </h2>
                <p className={`text-gray-400 max-w-md text-right mt-4 md:mt-0 ${manrope.className}`} data-aos="fade-left">
                    Our curriculum is a fusion of history, nature, and steel. Designed to forge the ultimate warrior.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {trainingItems.map((item, index) => (
                    <div
                        key={index}
                        className="group relative h-[600px] overflow-hidden rounded-2xl border border-white/5 bg-white/5"
                        data-aos="fade-up"
                        data-aos-delay={index * 150}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                            <h3 className={`text-5xl font-bold text-white/20 group-hover:text-white transition-colors duration-500 mb-2 ${cinzel.className}`}>
                                {item.title}
                            </h3>
                            <p className={`text-[#FD5D2F] uppercase tracking-widest text-sm mb-4 ${manrope.className}`}>
                                {item.subtitle}
                            </p>
                            <p className={`text-gray-300 font-light max-w-xs transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${manrope.className}`}>
                                {item.desc}
                            </p>
                        </div>

                        {/* Hover Border Glow */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}
