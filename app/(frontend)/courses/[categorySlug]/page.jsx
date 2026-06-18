import { Cinzel, Manrope } from "next/font/google";
import { Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import TextureBackground from "../../components/TextureBackground";
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export async function generateMetadata({ params }) {
    const payload = await getPayload({ config: configPromise });
    const { categorySlug } = await params;
    
    const categoriesRes = await payload.find({
        collection: 'categories',
        where: {
            slug: {
                equals: categorySlug,
            },
        },
    });

    const category = categoriesRes.docs[0];

    return {
        title: category ? `${category.title} | LHBS` : 'Programs | LHBS',
        description: `Explore all courses in our ${category?.title || 'Program'}.`,
    };
}

export default async function CategoryPage({ params }) {
    const payload = await getPayload({ config: configPromise });
    const { categorySlug } = await params;

    // Fetch the category
    const categoriesRes = await payload.find({
        collection: 'categories',
        where: {
            slug: {
                equals: categorySlug,
            },
        },
    });

    const category = categoriesRes.docs[0];

    if (!category) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
                <h1 className="text-3xl font-bold">Category Not Found</h1>
            </div>
        );
    }

    // Fetch courses for this category
    const coursesRes = await payload.find({
        collection: 'coursenames',
        where: {
            category: {
                equals: category.id,
            },
        },
        limit: 100,
    });

    const courses = coursesRes.docs;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FD5D2F] selection:text-white">
            <TextureBackground />

            {/* Header Section */}
            <div className="relative pt-40 pb-20 px-4 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C8295E] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

                <h1
                    className={`text-5xl md:text-7xl font-bold tracking-tighter mb-6 ${cinzel.className}`}
                    data-aos="zoom-in"
                >
                    {category.title.toUpperCase()}
                </h1>

                <p
                    className={`max-w-3xl mx-auto text-gray-300 text-lg md:text-xl font-light leading-relaxed ${manrope.className}`}
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Explore all courses available in our {category.title}. 
                    Start your journey with us and learn from the best.
                </p>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-4 pb-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course, index) => (
                        <div
                            key={course.slug || index}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#FD5D2F]/50 transition-all duration-500 group relative flex flex-col"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Image Area */}
                            <div className="h-48 relative overflow-hidden bg-black/50">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-[#FD5D2F]/20 transition-colors">
                                    <Zap size={48} strokeWidth={1} />
                                </div>
                                {(course.image?.url || course.image) && (
                                    <Image
                                        src={course.image?.url || course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 relative z-0"
                                    />
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="mb-auto">
                                    <span className={`block text-[#FD5D2F] text-[10px] font-bold tracking-widest uppercase mb-1 ${manrope.className}`}>
                                        {course.slogan}
                                    </span>
                                    <h3 className={`text-xl font-bold text-white mb-2 ${cinzel.className}`}>
                                        {course.title}
                                    </h3>
                                    <p className={`text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 ${manrope.className}`}>
                                        {course.description}
                                    </p>
                                </div>

                                <Link href={`/coursename/${course.slug}`}>
                                    <button className="w-full py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-[#FD5D2F] hover:border-[#FD5D2F] transition-all duration-300">
                                        Explore Course
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                    
                    {courses.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            No courses available in this category yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
