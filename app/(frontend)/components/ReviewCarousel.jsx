"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function ReviewCarousel({ reviews }) {
  const scrollContainerRef = useRef(null);
  const [shuffledReviews, setShuffledReviews] = useState([]);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      // Shuffle array
      const shuffled = [...reviews].sort(() => Math.random() - 0.5);
      setShuffledReviews(shuffled);
    }
  }, [reviews]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  if (!shuffledReviews || shuffledReviews.length === 0) return null;

  const averageRating = (reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / reviews.length).toFixed(1);

  return (
    <div className={`w-full py-20 bg-gray-50 overflow-hidden ${manrope.className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </div>
              <span className="text-gray-900 font-semibold text-lg tracking-tight">Rating</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              {averageRating}<span className="text-2xl text-gray-400 font-medium ml-1">/5</span>
            </h2>
            <div className="flex items-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-[#FBBC04]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-600 font-medium ml-2 text-sm">{reviews.length} Google Reviews</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://maps.app.goo.gl/Cnzw2Lrby94eG8ji9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-bold text-sm tracking-widest uppercase hover:underline mr-4"
            >
              Write a Review
            </a>
            <div className="hidden md:flex gap-2">
              <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {shuffledReviews.map((review, idx) => {
            const CardWrapper = review.googleMapsUrl ? 'a' : 'div';
            const wrapperProps = review.googleMapsUrl ? { 
              href: review.googleMapsUrl, 
              target: "_blank", 
              rel: "noopener noreferrer",
              className: "block min-w-[320px] max-w-[320px] md:min-w-[380px] md:max-w-[380px] bg-white p-7 rounded-2xl shadow-sm border border-gray-100 snap-start flex-shrink-0 flex flex-col hover:shadow-md hover:border-gray-200 transition-all cursor-pointer"
            } : {
              className: "min-w-[320px] max-w-[320px] md:min-w-[380px] md:max-w-[380px] bg-white p-7 rounded-2xl shadow-sm border border-gray-100 snap-start flex-shrink-0 flex flex-col"
            };

            return (
            <CardWrapper 
              key={review.id || idx}
              {...wrapperProps}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 relative">
                  {review.profilePhotoUrl ? (
                    <img 
                      src={review.profilePhotoUrl} 
                      alt={review.reviewerName} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold text-lg">
                      {review.reviewerName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base leading-tight">{review.reviewerName}</h3>
                  <div className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                    <span className="text-gray-400">Local Guide</span>
                  </div>
                </div>
                <div className="w-[18px] h-[18px] opacity-80">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-[#FBBC04]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {review.datePosted && (
                  <span className="text-gray-400 text-xs font-medium">{review.datePosted}</span>
                )}
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar max-h-[350px] pr-1">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {review.reviewText}
                </p>
              </div>
            </CardWrapper>
          )})}
        </div>
      </div>
      
      {/* CSS to hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
