"use client";

import { useState, useEffect, useRef } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { masterCourses, regularCourses } from '../utils/courseData';
import { Manrope, Cinzel } from 'next/font/google';

const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

export default function SearchOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);

    // Combine courses
    const allCourses = [...regularCourses, ...masterCourses];

    // Configure Fuse.js
    const fuse = new Fuse(allCourses, {
        keys: ['title', 'description', 'slogan', 'features'],
        threshold: 0.4, // Tolerance for typos
        distance: 100,
        includeScore: true
    });

    useEffect(() => {
        if (isOpen) {
            // Focus input when opened
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 1) {
            const fuseResults = fuse.search(value);
            setResults(fuseResults.map(result => result.item));
        } else {
            setResults([]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col pt-20 px-4 animate-in fade-in duration-200">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
                <X size={24} />
            </button>

            {/* Search Input */}
            <div className="max-w-3xl mx-auto w-full mb-8">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FD5D2F] transition-colors" size={24} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search for courses (e.g., 'Kung Fu', 'Weight Loss')..."
                        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white placeholder:text-gray-500 text-lg focus:outline-none focus:border-[#FD5D2F]/50 focus:bg-white/10 transition-all ${manrope.className}`}
                    />
                </div>
            </div>

            {/* Results */}
            <div className="max-w-3xl mx-auto w-full h-full overflow-y-auto pb-20 no-scrollbar">
                {query.length > 1 && results.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        <p className={manrope.className}>No courses found matching "{query}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((course) => (
                            <Link
                                href={`/coursename/${course.slug}`}
                                key={course.slug}
                                onClick={onClose}
                                className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:bg-white/10 hover:border-[#FD5D2F]/30 hover:-translate-y-1 transition-all group"
                            >
                                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <h4 className={`text-white font-bold truncate group-hover:text-[#FD5D2F] transition-colors ${cinzel.className}`}>
                                        {course.title}
                                    </h4>
                                    <p className={`text-xs text-gray-400 truncate mb-2 ${manrope.className}`}>
                                        {course.slogan}
                                    </p>
                                    <div className="flex items-center text-[#FD5D2F] text-xs font-bold gap-1">
                                        View Course <ChevronRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {query.length === 0 && (
                    <div className="text-center mt-10 opacity-40">
                        <Search size={48} className="mx-auto mb-4" />
                        <p className={`text-sm ${manrope.className}`}>Type to search anytime programs</p>
                    </div>
                )}
            </div>
        </div>
    );
}
