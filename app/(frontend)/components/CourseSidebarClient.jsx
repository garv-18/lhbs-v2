"use client";

import InstamojoButton from "./InstamojoButton";
import { Award, Shield, CheckCircle2 } from "lucide-react";
import { Cinzel, Manrope } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function CourseSidebarClient({ course, courseSlug }) {
  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-24 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="mb-6">
          <div className="flex items-end gap-2 mb-2">
            <span className={`text-4xl font-extrabold text-text ${cinzel.className}`}>₹{course.price.toLocaleString()}</span>
            <span className="text-gray-400 line-through text-lg mb-1">₹{(course.price + 2000).toLocaleString()}</span>
          </div>
          <p className="text-gray-500 text-sm">One-Time Payment for full lifetime access</p>
          <div className="mt-4 inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold border border-green-100">
            <Award size={16} />
            <span>Certified Course</span>
          </div>
        </div>

        <div className="space-y-4 mb-8 text-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-500">Duration</span>
            <span className="font-semibold text-text">Lifetime Access</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-500">Level</span>
            <span className="font-semibold text-text">All Levels</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-500">Language</span>
            <span className="font-semibold text-text">English / Hindi</span>
          </div>
        </div>

        <InstamojoButton
          amount={course.price}
          courseSlug={courseSlug}
          className="w-full py-4 rounded-xl bg-primary text-white font-bold text-base hover:bg-primary-hover hover:shadow-lg transition-all duration-300"
        />

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
            <Shield size={14} className="text-gray-400" />
            <span>25-Day Money-Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
            <CheckCircle2 size={14} className="text-gray-400" />
            <span>Secure Payment Encryption</span>
          </div>
        </div>
      </div>

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
