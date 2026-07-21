"use client";

import React, { useState, useEffect } from 'react';
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Lora, Inter } from "next/font/google";
import { Settings, ArrowLeft, Image as ImageIcon, Save, Check } from "lucide-react";
import Link from 'next/link';

const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function PinnacleEditor({ initialTitle = "", initialContent = null }) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [saveStatus, setSaveStatus] = useState("Idle");
  
  const [contentHtml, setContentHtml] = useState("");
  const [contentJson, setContentJson] = useState(initialContent || []);
  const [wordCount, setWordCount] = useState(0);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCoverInput, setShowCoverInput] = useState(false);

  // Initialize the BlockNote editor
  const editor = useCreateBlockNote({
    initialContent: initialContent && initialContent.length > 0 ? initialContent : undefined
  });

  // Track content changes
  const handleUpdate = async () => {
    const blocks = editor.document;
    setContentJson(blocks);
    
    const html = await editor.blocksToHTMLLossy(blocks);
    setContentHtml(html);

    // Calculate approximate word count from HTML text content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  };

  const handleSave = async () => {
    if (!title) {
      alert("Please provide a title");
      return;
    }
    
    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setSlug(generatedSlug); // Update UI with auto-generated slug

    setSaveStatus("Saving...");
    try {
      const blocks = editor.document;
      const html = await editor.blocksToHTMLLossy(blocks);

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: generatedSlug,
          contentJson: blocks,
          contentHtml: html,
          // We can add coverImage and excerpt to the backend payload schema later, but passing them now doesn't hurt.
          coverImage: coverImageUrl,
          excerpt: excerpt,
        })
      });

      if (!res.ok) throw new Error("Failed to save post");
      
      setSaveStatus("Saved");
      setTimeout(() => setSaveStatus("Idle"), 3000);
    } catch (err) {
      setSaveStatus("Error");
      console.error(err);
    }
  };

  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      
      {/* 1. STICKY TOP ACTION BAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/posts" className="text-gray-400 hover:text-gray-900 transition-colors flex items-center text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
          
          <div className="text-sm font-medium text-gray-400 flex items-center">
            {saveStatus === 'Saving...' && <Save className="w-4 h-4 mr-2 animate-pulse" />}
            {saveStatus === 'Saved' && <Check className="w-4 h-4 mr-2 text-green-500" />}
            {saveStatus === 'Error' && <span className="text-red-500">Failed to save</span>}
            {saveStatus === 'Idle' && <span>Draft</span>}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-full transition-colors ${sidebarOpen ? 'bg-gray-100 text-black' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'Saving...'}
            className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm"
          >
            {saveStatus === 'Saving...' ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </header>

      <main className="relative flex">
        {/* 2. THE CANVAS */}
        <div className="flex-1 max-w-[800px] mx-auto pt-16 pb-32 px-8">
          
          {/* Cover Image Section */}
          {coverImageUrl && (
            <div className="mb-10 relative group rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <img src={coverImageUrl} alt="Cover" className="w-full h-auto max-h-[400px] object-cover" />
              <button 
                onClick={() => setCoverImageUrl("")}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Remove
              </button>
            </div>
          )}

          {!coverImageUrl && showCoverInput && (
            <div className="mb-10 flex space-x-2">
              <input 
                type="text"
                placeholder="Paste an image URL..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-black text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCoverImageUrl(e.target.value);
                    setShowCoverInput(false);
                  }
                }}
              />
              <button onClick={() => setShowCoverInput(false)} className="px-4 text-sm text-gray-500 hover:text-black">Cancel</button>
            </div>
          )}

          <div className="group relative mb-8">
            {/* Add Cover Button (Shows on hover near title) */}
            {!coverImageUrl && !showCoverInput && (
              <button 
                onClick={() => setShowCoverInput(true)}
                className="absolute -top-10 left-0 flex items-center text-gray-400 hover:text-gray-900 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Add Cover Image
              </button>
            )}

            {/* Massive Title Input */}
            <textarea 
              placeholder="Post Title..." 
              className={`w-full text-5xl md:text-6xl font-bold border-none outline-none bg-transparent placeholder-gray-200 resize-none overflow-hidden ${lora.className} leading-[1.1]`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              rows={1}
            />
          </div>

          {/* BlockNote Editor (No borders, pure zen) */}
          <div className="prose prose-lg prose-p:text-gray-700 prose-headings:font-semibold max-w-none -ml-12">
            <BlockNoteView 
              editor={editor} 
              onChange={handleUpdate}
              theme="light"
            />
          </div>
        </div>

        {/* 3. METADATA SIDEBAR */}
        {sidebarOpen && (
          <aside className="w-80 border-l border-gray-100 bg-gray-50/50 min-h-screen p-6 hidden md:block">
            <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Post Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">SEO URL Slug</label>
                <div className="flex bg-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-black transition-colors">
                  <span className="bg-gray-50 px-3 py-2 text-gray-400 text-sm border-r border-gray-200">/</span>
                  <input 
                    type="text"
                    placeholder="auto-generated"
                    className="w-full px-3 py-2 outline-none text-sm bg-transparent"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Leave blank to auto-generate from title.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Excerpt</label>
                <textarea 
                  placeholder="A brief summary for blog cards and SEO..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black text-sm resize-none h-32 transition-colors"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>
            </div>
          </aside>
        )}
      </main>

      {/* 4. FLOATING WORD COUNT */}
      <div className="fixed bottom-6 right-6 bg-white border border-gray-100 shadow-sm rounded-full px-4 py-2 text-xs font-medium text-gray-500 flex items-center z-40">
        {wordCount} words <span className="mx-2 text-gray-300">|</span> {Math.max(1, Math.ceil(wordCount / 200))} min read
      </div>

    </div>
  );
}
