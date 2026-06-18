"use client";

import PricingCard from "./PricingCard";
import InstamojoButton from "./InstamojoButton";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

export default function CourseSidebarClient({ course, courseSlug }) {
  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <PricingCard course={course} courseSlug={courseSlug} className="hidden lg:block sticky top-24" />

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 px-4 pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Lifetime Access</span>
          <div className="flex items-center gap-2">
            <span className={`text-xl font-bold text-text ${cinzel.className}`}>₹{course.price.toLocaleString()}</span>
          </div>
        </div>
        
        <InstamojoButton
          amount={course.price}
          courseSlug={courseSlug}
          className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-all duration-300 shadow-sm"
        />
      </div>
    </>
  );
}
