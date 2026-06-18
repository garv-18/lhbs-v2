"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CourseListClient({ categories }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const allCourses = categories.flatMap(cat => cat.courses.map(c => ({...c, categorySlug: cat.slug})));
  
  const displayedCourses = activeCategory === 'all' 
    ? allCourses 
    : allCourses.filter(c => c.categorySlug === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 items-start">
      {/* Sidebar Filter */}
      <div className="w-full md:w-64 shrink-0 md:sticky top-24 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-text mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => setActiveCategory('all')}
              className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              All Courses
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat.id}>
              <button 
                onClick={() => setActiveCategory(cat.slug)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === cat.slug ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {cat.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Courses Grid */}
      <div className="flex-1 w-full">
        <div className="mb-6 flex justify-between items-end">
          <h2 className="text-2xl font-bold text-text">
            {activeCategory === 'all' ? 'All Courses' : categories.find(c => c.slug === activeCategory)?.title}
          </h2>
          <span className="text-sm text-gray-500 font-medium">{displayedCourses.length} courses found</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course, index) => (
            <div
              key={course.id || index}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col shadow-sm"
            >
              <div className="h-48 relative overflow-hidden bg-gray-100">
                {(course.image?.url || course.image) && (
                  <Image
                    src={course.image?.url || course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 relative z-0"
                  />
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-auto">
                  <span className="block text-primary text-xs font-semibold tracking-wide uppercase mb-1.5">
                    {course.slogan}
                  </span>
                  <h3 className="text-xl font-bold text-text mb-2 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-50">
                   <span className="font-bold text-lg text-text">₹{course.price?.toLocaleString()}</span>
                   <Link href={`/coursename/${course.slug}`}>
                      <button className="px-5 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover transition-colors duration-300 text-sm">
                        Enroll
                      </button>
                   </Link>
                </div>
              </div>
            </div>
          ))}

          {displayedCourses.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
               No courses available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
