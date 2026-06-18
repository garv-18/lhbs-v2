"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cinzel, Manrope } from "next/font/google";
import FavoriteButton from "./FavoriteButton";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function CourseListClient({ categories }) {
  const [navbarHeight, setNavbarHeight] = useState(68);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updateHeight = () => {
      const nav = document.getElementById('navbar');
      if (nav) {
        setNavbarHeight(nav.offsetHeight);
      }
    };
    
    // Initial measurement
    updateHeight();
    
    // Update on resize
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const filteredCategories = categories.map(category => {
    if (!searchQuery) return category;
    
    const lowerQuery = searchQuery.toLowerCase();
    const filteredCourses = category.courses?.filter(course => 
      course.title.toLowerCase().includes(lowerQuery) || 
      course.description?.toLowerCase().includes(lowerQuery)
    );
    
    return { ...category, courses: filteredCourses };
  }).filter(category => category.courses && category.courses.length > 0);

  return (
    <div className="w-full bg-background pb-20">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-8">
        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for courses, martial arts, fitness..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-8 py-4 bg-white border border-gray-200 rounded-full shadow-sm text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg ${manrope.className}`}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {filteredCategories.length === 0 && (
        <div className="text-center py-20">
          <p className={`text-xl text-gray-500 ${manrope.className}`}>No courses found matching "{searchQuery}"</p>
        </div>
      )}

      {filteredCategories.map((category) => {
        if (!category.courses || category.courses.length === 0) return null;

        // Display up to 8 courses (2 perfect rows on desktop, 4 on mobile)
        const displayedCourses = category.courses.slice(0, 8);

        return (
          <div key={category.id} className="relative pt-8 mb-4">
            {/* Sticky Header */}
            <div 
              className="sticky z-40 bg-background/95 backdrop-blur-md py-4 mb-8 flex justify-between items-center"
              style={{ top: `${navbarHeight}px` }}
            >
              <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
                <h2 className={`text-2xl font-bold text-text ${cinzel.className}`}>
                  {category.title}
                </h2>
                <Link href={`/courses/${category.slug}`}>
                  <button className="text-sm font-bold text-primary hover:text-[#C8295E] transition-colors uppercase tracking-wider">
                    View All
                  </button>
                </Link>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6">
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
                      <h3 className={`text-xl md:text-2xl text-text mb-4 ${cinzel.className} line-clamp-2`}>
                        {course.title}
                      </h3>
                      
                      <div className="flex justify-between items-end mt-auto gap-4">
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

              {/* Bottom View All Button */}
              {category.courses.length > 8 && (
                <div className="mt-12 text-center">
                  <Link href={`/courses/${category.slug}`}>
                    <button className="px-8 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-text transition-all duration-300 text-sm font-semibold shadow-sm">
                      View All {category.title}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
