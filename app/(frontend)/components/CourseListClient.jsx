"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cinzel, Manrope } from "next/font/google";
import FavoriteButton from "./FavoriteButton";
import CourseImage from "./CourseImage";

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

  const isSearching = searchQuery.trim().length > 0;

  // Flattened search results
  let allSearchMatches = [];
  if (isSearching) {
    const lowerQuery = searchQuery.toLowerCase();
    categories.forEach(category => {
      if (category.courses) {
        const matches = category.courses.filter(course => 
          course.title.toLowerCase().includes(lowerQuery) || 
          course.description?.toLowerCase().includes(lowerQuery)
        );
        matches.forEach(m => allSearchMatches.push({ ...m, categorySlug: category.slug }));
      }
    });
  }

  return (
    <div className="w-full bg-background pb-20">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-6">
        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for courses, martial arts, fitness..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-5 py-3.5 pr-12 bg-white border border-gray-200 rounded-2xl md:rounded-full shadow-sm text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base md:px-8 md:py-4 md:text-lg ${manrope.className}`}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Quick-Jump Category Menu (Hidden when searching) */}
      {!isSearching && (
        <div className="max-w-7xl mx-auto px-4 pb-8 overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 md:justify-center md:min-w-0">
            {categories.filter(c => c.courses && c.courses.length > 0).map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  const el = document.getElementById(`category-${category.slug}`);
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className={`px-6 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-primary hover:text-white hover:border-primary transition-all text-sm font-semibold text-gray-700 whitespace-nowrap shadow-sm ${manrope.className}`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Flat Search Results */}
      {isSearching && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <h2 className={`text-2xl font-bold text-text mb-8 ${cinzel.className}`}>
            Search Results for "{searchQuery}"
          </h2>
          
          {allSearchMatches.length === 0 ? (
            <div className="text-center py-20">
              <p className={`text-xl text-gray-500 ${manrope.className}`}>No courses found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {allSearchMatches.map((course, index) => (
                <Link
                  href={`/courses/${course.categorySlug}/${course.slug}`}
                  key={course.id || index}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-xl transition-all duration-300 group flex flex-col shadow-sm"
                >
                  <div className="aspect-square w-full relative overflow-hidden bg-gray-50">
                    <CourseImage
                      src={course.image?.url || course.image}
                      alt={course.title}
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                    <FavoriteButton course={{...course, categorySlug: course.categorySlug}} />
                  </div>
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
                          {course.price ? `Rs. ${course.price.toLocaleString()}` : 'Rs. 2,999'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Normal Category Grid */}
      {!isSearching && categories.map((category) => {
        if (!category.courses || category.courses.length === 0) return null;

        // Display up to 8 courses
        const displayedCourses = category.courses.slice(0, 8);

        return (
          <div key={category.id} id={`category-${category.slug}`} className="relative pt-4 mb-4 scroll-mt-24">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedCourses.map((course, index) => (
                  <Link
                    href={`/courses/${category.slug}/${course.slug}`}
                    key={course.id || index}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-xl transition-all duration-300 group flex flex-col shadow-sm"
                  >
                    <div className="aspect-square w-full relative overflow-hidden bg-gray-50">
                      <CourseImage
                        src={course.image?.url || course.image}
                        alt={course.title}
                        className="group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Favorite Icon */}
                      <FavoriteButton course={{...course, categorySlug: category.slug}} />
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
                            {course.price ? `Rs. ${course.price.toLocaleString()}` : 'Rs. 2,999'}
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
