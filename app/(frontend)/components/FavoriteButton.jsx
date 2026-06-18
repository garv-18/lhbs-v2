"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function FavoriteButton({ course }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        try {
            const savedFavorites = JSON.parse(localStorage.getItem("lhbs_favorites") || "[]");
            const isFav = savedFavorites.some(fav => fav.slug === course.slug);
            setIsFavorite(isFav);
        } catch (e) {
            console.error("Error reading favorites from localStorage", e);
        }
    }, [course.slug]);

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
            const savedFavorites = JSON.parse(localStorage.getItem("lhbs_favorites") || "[]");
            const existingIndex = savedFavorites.findIndex(fav => fav.slug === course.slug);
            
            let newFavorites;
            if (existingIndex >= 0) {
                // Remove it
                newFavorites = savedFavorites.filter(fav => fav.slug !== course.slug);
                setIsFavorite(false);
            } else {
                // Add it. Store minimal needed info to render cards
                const minimalCourse = {
                    id: course.id || course.title,
                    slug: course.slug,
                    categorySlug: course.categorySlug,
                    title: course.title,
                    description: course.description,
                    image: course.image,
                    price: course.price,
                };
                newFavorites = [...savedFavorites, minimalCourse];
                setIsFavorite(true);
            }
            
            localStorage.setItem("lhbs_favorites", JSON.stringify(newFavorites));
            
            // Dispatch a custom event so other components (like the /favorites page) can update
            window.dispatchEvent(new Event('favoritesUpdated'));
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    };

    if (!isMounted) return <div className="absolute top-4 right-4 p-2.5 w-9 h-9"></div>;

    return (
        <button 
            onClick={toggleFavorite}
            className="absolute top-4 right-4 bg-white p-2.5 rounded-xl shadow-sm z-10 text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-300"
        >
            <Heart 
                size={18} 
                strokeWidth={2.5} 
                className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : ""}`} 
            />
        </button>
    );
}
