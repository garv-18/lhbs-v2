"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import Fuse from 'fuse.js';
import Link from 'next/link';

export default function SearchOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const inputRef = useRef(null);

    // Fetch courses when overlay is opened
    useEffect(() => {
        if (isOpen && allCourses.length === 0) {
            fetch('/api/coursenames?limit=100&depth=1')
                .then(res => res.json())
                .then(data => setAllCourses(data.docs || []))
                .catch(err => console.error("Error fetching courses", err));
        }
    }, [isOpen, allCourses.length]);

    // Configure Fuse.js
    const fuse = useMemo(() => new Fuse(allCourses, {
        keys: ['title', 'description', 'slogan', 'features.feature'],
        threshold: 0.4, 
        distance: 100,
        includeScore: true
    }), [allCourses]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setResults([]);
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
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
        <div 
            className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm flex justify-center items-start pt-20 px-4 sm:pt-32 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="relative border-b border-gray-100">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search for courses..."
                        className="w-full bg-transparent py-3 pl-11 pr-4 text-text placeholder:text-gray-400 text-base focus:outline-none"
                    />
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto bg-gray-50/50">
                    {query.length > 1 && results.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                            <p>No courses found matching "{query}"</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {results.map((course) => (
                                <Link
                                    href={`/courses/${course.category?.slug || 'master-program'}/${course.slug}`}
                                    key={course.slug}
                                    onClick={onClose}
                                    className="p-4 flex gap-4 hover:bg-gray-100 border-b border-gray-100 last:border-none transition-colors group"
                                >
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                                        {(course.image?.url || course.image) && (
                                           <img src={course.image?.url || course.image} alt={course.title} className="w-full h-full object-cover pointer-events-none select-none" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center flex-1 min-w-0">
                                        <h4 className="text-text font-bold truncate group-hover:text-primary transition-colors">
                                            {course.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 truncate mb-1">
                                            {course.slogan}
                                        </p>
                                        <div className="flex items-center text-primary text-xs font-semibold gap-1">
                                            View Course <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {query.length === 0 && (
                        <div className="text-center py-10 opacity-50">
                            <Search size={32} className="mx-auto mb-3 text-gray-400" />
                            <p className="text-sm text-gray-500">Type to search anytime programs</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
