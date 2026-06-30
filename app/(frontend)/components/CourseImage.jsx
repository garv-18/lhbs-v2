"use client";

import { ImageOff } from "lucide-react";
import { useState } from "react";

export default function CourseImage({ src, alt, className = "" }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary/10 px-4 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ring-1 ring-gray-100">
          <ImageOff size={22} />
        </div>
        <p className="max-w-[12rem] text-xs font-bold uppercase tracking-widest text-gray-500">
          {alt || "Course image"}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Course image"}
      className={`absolute inset-0 h-full w-full object-cover pointer-events-none select-none ${className}`}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onError={() => setHasError(true)}
    />
  );
}
