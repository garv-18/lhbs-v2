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
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                alt="Google" 
                width={24} 
                height={24} 
                className="w-6 h-6"
              />
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
              href="https://maps.google.com" 
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
                    <Image 
                      src={review.profilePhotoUrl} 
                      alt={review.reviewerName} 
                      fill
                      sizes="48px"
                      className="object-cover" 
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
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                  alt="Google" 
                  width={18} 
                  height={18} 
                  className="opacity-80"
                />
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
