"use client";
import { motion } from "framer-motion";
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

export default function Training({ media }) {
    const dynamicTrainingItems = trainingItems.map(item => {
        if (item.title === "CULTURES" && media?.trainingCulturesImage?.url) {
            return { ...item, image: media.trainingCulturesImage.url };
        }
        if (item.title === "ANIMALS" && media?.trainingAnimalsImage?.url) {
            return { ...item, image: media.trainingAnimalsImage.url };
        }
        if (item.title === "WEAPONS" && media?.trainingWeaponsImage?.url) {
            return { ...item, image: media.trainingWeaponsImage.url };
        }
        return item;
    });

    return (
        <section id="training" className="relative py-32 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 border-b border-gray-200 pb-8">
                <motion.h2
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className={`text-4xl md:text-7xl text-text font-extrabold tracking-tight ${cinzel.className}`}
                >
                    WHAT WE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#C8295E]">TRAIN</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className={`text-gray-500 max-w-md text-right mt-4 md:mt-0 ${manrope.className}`}
                >
                    Our curriculum is a fusion of history, nature, and steel. Designed to forge the ultimate warrior.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {dynamicTrainingItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.15 }}
                        className="group relative h-[600px] overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                            <h3 className={`text-5xl font-bold text-white/40 group-hover:text-white transition-colors duration-500 mb-2 ${cinzel.className}`}>
                                {item.title}
                            </h3>
                            <p className={`text-primary font-bold uppercase tracking-widest text-sm mb-4 ${manrope.className}`}>
                                {item.subtitle}
                            </p>
                            <p className={`text-white font-medium max-w-xs transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${manrope.className}`}>
                                {item.desc}
                            </p>
                        </div>

                        {/* Hover Border Glow */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-3xl transition-colors duration-500 pointer-events-none"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
