"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
export const dynamic = 'force-dynamic';
import { Cinzel, Manrope } from "next/font/google";
import FavoriteButton from "../components/FavoriteButton";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    const loadFavorites = () => {
        try {
            const saved = JSON.parse(localStorage.getItem("lhbs_favorites") || "[]");
            setFavorites(saved);
        } catch (e) {
            console.error("Error loading favorites", e);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        loadFavorites();

        // Listen for changes from FavoriteButton
        window.addEventListener("favoritesUpdated", loadFavorites);
        return () => window.removeEventListener("favoritesUpdated", loadFavorites);
    }, []);

    if (!isMounted) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 text-text pb-20">
            {/* Header */}
            <div className="relative pt-28 pb-8 px-4 text-center overflow-hidden bg-gray-50 border-b border-gray-100">
                <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-text ${cinzel.className}`}>
                    Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF9F1C]">Favorites</span>
                </h1>
                <p className={`max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed ${manrope.className}`}>
                    Saved courses that you want to master.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {favorites.length === 0 ? (
                    <div className="text-center py-20">
                        <p className={`text-xl text-gray-500 mb-6 ${manrope.className}`}>You haven't saved any courses yet.</p>
                        <Link href="/courses">
                            <button className="px-8 py-3 bg-text text-white font-bold rounded-xl hover:bg-gray-800 transition-colors uppercase tracking-widest shadow-sm">
                                Explore Courses
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {favorites.map((course, index) => (
                            <Link
                                href={`/courses/${course.categorySlug || 'master-program'}/${course.slug}`}
                                key={course.id || index}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-xl transition-all duration-300 group flex flex-col shadow-sm"
                            >
                                <div className="aspect-square w-full relative overflow-hidden bg-gray-50">
                                    {(course.image?.url || course.image) && (
                                        <img
                                            src={course.image?.url || course.image}
                                            alt={course.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 relative z-0"
                                        />
                                    )}
                                    
                                    {/* Favorite Icon */}
                                    <FavoriteButton course={course} />
                                </div>

                                {/* Content Area */}
                                <div className="p-4 md:p-6 flex-1 flex flex-col bg-white border-t border-gray-50">
                                    <h3 className={`text-base sm:text-lg md:text-2xl text-text mb-3 md:mb-4 ${cinzel.className} line-clamp-2`}>
                                        {course.title}
                                    </h3>
                                    
                                    <div className="flex justify-between items-end mt-auto gap-2 md:gap-4">
                                        <div className="flex-1">
                                            <p className={`text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 font-medium ${manrope.className}`}>
                                                {course.description}
                                            </p>
                                        </div>
                                        <div className="shrink-0">
                                            <span className={`text-base sm:text-xl md:text-2xl text-text tracking-tight ${cinzel.className}`}>
                                                {course.price ? `₹${course.price.toLocaleString()}` : '₹2999'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
