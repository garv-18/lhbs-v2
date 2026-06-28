"use client";
import { motion } from "framer-motion";
import { Cinzel, Manrope } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500"] });

const programs = [
    {
        title: "Expert Program",
        duration: "12 Courses • 25 Days Each",
        description: "A professional course to become an Expert of Martial Arts. Train from basic to advanced levels in 12 months of intense, transformative learning.",
        image: "https://ik.imagekit.io/lhbs/MAEP2.0.png?updatedAt=1751458697819",
        color: "from-[#C8295E] to-[#F81F24]",
        whatsapp: "https://api.whatsapp.com/send?phone=919713600085&text=Hello%2C%0AInterested%20to%20know%20more%20about%20Martial%20Arts%20Expert%20Program.%20Please%20share%20details%20with%20PDF.",
        link: "/courses"
    },
    {
        title: "Master Program",
        duration: "18 Courses • 25 Days Each",
        description: "The ultimate course to become a Master. Focus on deep principles and advanced moves. Requires completion of the Expert Program.",
        image: "/images/master_program_cover.png",
        color: "from-[#F81F24] to-[#FD5D2F]",
        whatsapp: "https://api.whatsapp.com/send?phone=919713600085&text=hello%2C%0APlease%20share%20me%20details%20of%20your%20Master%20program",
        link: "/courses"
    },
    {
        title: "Business Program",
        duration: "3 Courses • 25 Days Each",
        description: "Build your own Martial Arts School. Learn the business model, technical training, and management skills to run a successful organization.",
        image: "/images/business_program_cover.png",
        color: "from-[#FD5D2F] to-[#FF9F1C]",
        whatsapp: "https://api.whatsapp.com/send?phone=919713600085&text=hello%2C%0APlease%20share%20me%20details%20of%20your%20Master%20program",
        link: "/courses"
    },
];

export default function Programs({ media }) {
    // Override images dynamically if provided from CMS
    const dynamicPrograms = programs.map(program => {
        if (program.title === "Expert Program" && media?.expertProgramImage?.url) {
            return { ...program, image: media.expertProgramImage.url };
        }
        if (program.title === "Master Program" && media?.masterProgramImage?.url) {
            return { ...program, image: media.masterProgramImage.url };
        }
        if (program.title === "Business Program" && media?.businessProgramImage?.url) {
            return { ...program, image: media.businessProgramImage.url };
        }
        return program;
    });

    return (
        <section id="programs" className="relative py-32 px-4 max-w-7xl mx-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className={`text-4xl md:text-6xl text-center mb-20 text-text font-extrabold tracking-tight ${cinzel.className}`}
            >
                CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF9F1C]">PATH</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {dynamicPrograms.map((program, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
                        className="group relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
                    >
                        {/* Image Background with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <div className={`absolute inset-0 bg-gradient-to-b from-black/5 via-black/60 to-black/90 z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500`}></div>
                            <Image
                                src={program.image}
                                alt={program.title}
                                fill
                                className="object-cover transition-all duration-700 transform group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-20 p-8 h-full flex flex-col justify-end min-h-[500px]">
                            <div className={`w-12 h-1.5 rounded-full mb-6 bg-gradient-to-r ${program.color}`}></div>

                            <h3 className={`text-3xl font-extrabold text-white mb-2 ${cinzel.className} drop-shadow-md`}>
                                {program.title}
                            </h3>

                            <p className={`text-white/90 font-bold text-sm tracking-widest uppercase mb-4 ${manrope.className} drop-shadow`}>
                                {program.duration}
                            </p>

                            <p className={`text-gray-200 font-medium leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ${manrope.className}`}>
                                {program.description}
                            </p>

                            <div className="flex flex-col gap-3">
                                <a
                                    href={program.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white/90 hover:text-[#25D366] transition-all duration-300 font-semibold"
                                >
                                    <span className="uppercase tracking-widest text-sm drop-shadow-md">Get Free PDF</span>
                                    <ArrowUpRight size={18} />
                                </a>

                                <Link
                                    href={program.link}
                                    className="flex items-center gap-2 text-white/90 hover:text-primary transition-all duration-300 font-semibold"
                                >
                                    <span className="uppercase tracking-widest text-sm drop-shadow-md">View All Courses</span>
                                    <ArrowUpRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
