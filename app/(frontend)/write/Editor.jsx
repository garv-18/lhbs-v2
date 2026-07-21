"use client";

import React, { useState, useEffect } from 'react';
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function BlockNoteEditor({ initialTitle = "", initialContent = null }) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState("");
  const [saveStatus, setSaveStatus] = useState("Idle");
  const [contentHtml, setContentHtml] = useState("");
  const [contentJson, setContentJson] = useState(initialContent || []);

  // Initialize the BlockNote editor
  const editor = useCreateBlockNote({
    initialContent: initialContent && initialContent.length > 0 ? initialContent : undefined
  });

  // Track content changes
  const handleUpdate = async () => {
    // Get JSON blocks
    const blocks = editor.document;
    setContentJson(blocks);
    
    // Convert to HTML for standard rendering on the frontend
    const html = await editor.blocksToHTMLLossy(blocks);
    setContentHtml(html);
  };

  const handleSave = async () => {
    if (!title) {
      alert("Please provide a title");
      return;
    }
    
    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    setSaveStatus("Saving...");
    try {
      // Force an update to ensure we have the absolute latest HTML before saving
      const blocks = editor.document;
      const html = await editor.blocksToHTMLLossy(blocks);

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: generatedSlug,
          contentJson: blocks,
          contentHtml: html
        })
      });

      if (!res.ok) throw new Error("Failed to save post");
      
      setSaveStatus("Saved!");
      setTimeout(() => setSaveStatus("Idle"), 3000);
    } catch (err) {
      setSaveStatus("Error saving");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      
      <div className="mb-8 flex items-center justify-between">
        <div className="flex-1 mr-8">
          <input 
            type="text" 
            placeholder="Post Title..." 
            className="w-full text-5xl font-bold border-none outline-none bg-transparent placeholder-gray-300 font-sans"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {title && (
            <div className="mt-2 text-sm text-gray-400 flex items-center">
              <span>https://www.martialartsschool.in/posts/</span>
              <input 
                type="text"
                placeholder="slug"
                className="border-b border-gray-200 outline-none text-gray-500 bg-transparent w-full max-w-[200px] ml-1"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              />
            </div>
          )}
        </div>
        
        <button 
          onClick={handleSave}
          className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          {saveStatus === 'Saving...' ? 'Saving...' : 'Publish'}
        </button>
      </div>

      <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white min-h-[600px] pt-8 pb-16">
        {/* BlockNote handles all the Notion-like UI! */}
        <BlockNoteView 
          editor={editor} 
          onChange={handleUpdate}
          theme="light"
        />
      </div>

    </div>
  );
}
