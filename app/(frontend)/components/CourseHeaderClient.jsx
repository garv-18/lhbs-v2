"use client";

import { Share, Heart } from "lucide-react";
import { Cinzel, Manrope } from "next/font/google";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500"] });

export default function CourseHeaderClient({ course, categorySlug, courseSlug }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${course.title} | LHBS Master Program`,
          text: course.slogan || course.description?.substring(0, 100),
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div className="flex-1">
        {/* Breadcrumbs */}
        <div className={`text-sm text-gray-500 mb-4 flex items-center gap-2 ${manrope.className}`}>
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
          <span>/</span>
          <Link href={`/courses/${categorySlug}`} className="hover:text-primary transition-colors capitalize">
            {categorySlug.replace("-", " ")}
          </Link>
        </div>

        {/* Title */}
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-3 text-text leading-tight tracking-tight ${cinzel.className}`}>
          {course.title}
        </h1>
        
        {/* Badges */}
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500 font-medium">Lifetime Access</span>
        </div>
      </div>

      {/* Share and Save Buttons */}
      <div className="flex items-center gap-3 shrink-0 self-start">
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm text-text shadow-sm"
        >
          <Share size={16} />
          Share
        </button>

        {/* FavoriteButton component is styled differently, we will wrap it to match the Share button */}
        <div className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm text-text shadow-sm cursor-pointer [&>button]:static [&>button]:p-0 [&>button]:bg-transparent [&>button]:shadow-none [&>button]:text-text">
          <FavoriteButton course={{...course, categorySlug}} />
          <span className="pointer-events-none">Save</span>
        </div>
      </div>
    </div>
  );
}
