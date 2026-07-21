"use client";

import dynamic from 'next/dynamic';

const NovelEditor = dynamic(() => import('./Editor'), { ssr: false });

export default function EditorWrapper() {
  return <NovelEditor />;
}
