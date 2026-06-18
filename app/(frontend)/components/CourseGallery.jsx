"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Grid } from "lucide-react";

export default function CourseGallery({ photos }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index = 0) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const renderGrid = () => {
    if (photos.length === 1) {
      return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden mb-8 group cursor-pointer" onClick={() => openModal(0)}>
          <Image 
            src={photos[0]} 
            alt="Course main image" 
            fill
            className="object-contain bg-gray-50 hover:scale-105 transition-transform duration-500"
            priority
          />
          <button 
            onClick={(e) => { e.stopPropagation(); openModal(0); }}
            className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-text px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-50 hover:scale-105 transition-all shadow-md z-10"
          >
            <Grid size={18} />
            View photo
          </button>
        </div>
      );
    }

    if (photos.length === 2) {
      return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden mb-8 group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
            <div className="relative h-full cursor-pointer overflow-hidden" onClick={() => openModal(0)}>
              <Image src={photos[0]} alt="Course main image" fill className="object-contain bg-gray-50 hover:scale-105 transition-transform duration-500" priority />
            </div>
            <div className="hidden md:block relative h-full cursor-pointer overflow-hidden" onClick={() => openModal(1)}>
              <Image src={photos[1]} alt="Course image 2" fill className="object-contain bg-gray-50 hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
          <button onClick={() => openModal(0)} className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-text px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-50 hover:scale-105 transition-all shadow-md z-10">
            <Grid size={18} />
            Show all photos
          </button>
        </div>
      );
    }

    // 3 or more photos
    return (
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden mb-8 group">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
          {/* Main Left Image */}
          <div className="relative h-full cursor-pointer overflow-hidden" onClick={() => openModal(0)}>
            <Image src={photos[0]} alt="Course main image" fill className="object-contain bg-gray-50 hover:scale-105 transition-transform duration-500" priority />
          </div>
          
          {/* Right Images (Hidden on small mobile, visible on md+) */}
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <div className="relative h-full cursor-pointer overflow-hidden" onClick={() => openModal(1)}>
              <Image src={photos[1]} alt="Course image 2" fill className="object-contain bg-gray-50 hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative h-full cursor-pointer overflow-hidden group/overlay" onClick={() => openModal(2)}>
              <Image src={photos[2]} alt="Course image 3" fill className="object-contain bg-gray-50 hover:scale-105 transition-transform duration-500" />
              {photos.length > 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300">
                  <span className="text-white text-3xl font-bold tracking-wider">+{photos.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <button onClick={() => openModal(0)} className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-text px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-50 hover:scale-105 transition-all shadow-md z-10">
          <Grid size={18} />
          Show all photos
        </button>
      </div>
    );
  };

  return (
    <>
      {renderGrid()}

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Top Bar */}
          <div className="flex justify-between items-start p-4 md:p-6 bg-white z-20 shrink-0">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1">Photo Tour</p>
              <h2 className="text-xl md:text-2xl font-bold text-text">{title || "Course Details"}</h2>
            </div>
            <button 
              onClick={closeModal}
              className="p-2 border border-gray-200 hover:bg-gray-50 rounded-full transition-colors text-gray-500 shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Content - 2 Columns on desktop */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-white max-w-[1400px] mx-auto w-full">
            
            {/* Left: Main Slider */}
            <div className="flex-1 relative flex items-center justify-center p-4 md:p-6 min-h-[50vh] lg:min-h-0">
              <div className="relative w-full h-full max-h-[85vh] rounded-2xl md:rounded-3xl overflow-hidden bg-gray-50 group/slider border border-gray-100 shadow-sm">
                <Image
                  src={photos[currentIndex]}
                  alt={`Photo ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority={true}
                />
                
                {/* Arrows */}
                <button 
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white hover:bg-gray-50 text-text rounded-full transition-colors z-20 shadow-md border border-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white hover:bg-gray-50 text-text rounded-full transition-colors z-20 shadow-md border border-gray-100"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest z-20">
                  {currentIndex + 1} / {photos.length}
                </div>
              </div>
            </div>

            {/* Right: Thumbnails */}
            <div className="w-full lg:w-[380px] xl:w-[450px] bg-white overflow-y-auto p-4 md:p-6 shrink-0 h-[40vh] lg:h-full pb-20 scrollbar-hide">
              <h3 className="font-bold text-base mb-6 text-text">All photos</h3>
              <div className="grid grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                  <div 
                    key={index} 
                    onClick={() => setCurrentIndex(index)}
                    className={`relative aspect-square cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${currentIndex === index ? 'border-text ring-2 ring-text/10' : 'border-transparent hover:border-gray-200 opacity-80 hover:opacity-100'}`}
                  >
                    <Image 
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
