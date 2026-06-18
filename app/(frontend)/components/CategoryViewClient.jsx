"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cinzel, Manrope } from "next/font/google";
import FavoriteButton from "./FavoriteButton";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function CategoryViewClient({ category, courses }) {
  const [searchQuery, setSearchQuery] = useState("");

  const lowerQuery = searchQuery.toLowerCase();
  const displayedCourses = courses.filter(course => 
    course.title.toLowerCase().includes(lowerQuery) || 
    course.description?.toLowerCase().includes(lowerQuery)
  );

  return (
    <div className="min-h-screen bg-background text-text pb-20">
      {/* Header Section */}
      <div className="relative pt-28 pb-8 px-4 text-center overflow-hidden bg-gray-50 border-b border-gray-100">
        <h1
          className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-text ${cinzel.className}`}
          data-aos="zoom-in"
        >
          {category.title}
        </h1>

        <p
          className={`max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed mb-6 ${manrope.className}`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Explore all courses available in {category.title}. 
          Start your journey with us and learn from the best.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder={`Search in ${category.title}...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-8 py-4 bg-white border border-gray-200 rounded-full shadow-sm text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg ${manrope.className}`}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4">
        {displayedCourses.length === 0 ? (
          <div className="text-center py-20">
             <p className={`text-xl text-gray-500 ${manrope.className}`}>
               {searchQuery ? `No courses found matching "${searchQuery}"` : "No courses available in this category yet."}
             </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {displayedCourses.map((course, index) => (
              <Link
                href={`/courses/${category.slug}/${course.slug}`}
                key={course.id || index}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-xl transition-all duration-300 group flex flex-col shadow-sm"
              >
                <div className="h-[280px] sm:h-[360px] w-full relative overflow-hidden bg-gray-50">
                  {(course.image?.url || course.image) && (
                    <img
                      src={course.image?.url || course.image}
                      alt={course.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 relative z-0"
                    />
                  )}
                  
                  {/* Favorite Icon */}
                  <FavoriteButton course={{...course, categorySlug: category.slug}} />
                </div>

                {/* Content Area */}
                <div className="p-5 md:p-6 flex-1 flex flex-col bg-white border-t border-gray-50">
                  <h3 className={`text-xl md:text-2xl text-text mb-4 ${cinzel.className} line-clamp-1`}>
                    {course.title}
                  </h3>
                  
                  <div className="flex justify-between items-end mt-auto gap-2">
                    <div className="flex-1">
                      <p className={`text-gray-600 text-sm leading-relaxed line-clamp-2 font-medium ${manrope.className}`}>
                        {course.description}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className={`text-xl md:text-2xl text-text tracking-tight ${cinzel.className}`}>
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
