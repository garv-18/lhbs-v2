"use client";

import React, { useState } from 'react';
import { EditorRoot, EditorContent } from "novel";

export default function NovelEditor({ initialTitle = "", initialContent = null }) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState("");
  const [saveStatus, setSaveStatus] = useState("Idle");
  
  // We need to keep track of the editor content.
  // In novel v0.4, onUpdate passes an editor instance which we can use to get JSON/HTML.
  const [contentJson, setContentJson] = useState(initialContent);
  const [contentHtml, setContentHtml] = useState("");

  const handleUpdate = (editor) => {
    setContentJson(editor?.getJSON());
    setContentHtml(editor?.getHTML());
  };

  const handleSave = async () => {
    if (!title) {
      alert("Please provide a title");
      return;
    }
    
    // Auto-generate slug if not provided
    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    setSaveStatus("Saving...");
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: generatedSlug,
          contentJson,
          contentHtml
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
            className="w-full text-5xl font-bold border-none outline-none bg-transparent placeholder-gray-300"
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

      <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white min-h-[500px]">
        <EditorRoot>
          <EditorContent
            immediatelyRender={false}
            initialContent={contentJson}
            onUpdate={({ editor }) => handleUpdate(editor)}
            extensions={[]} 
            className="prose prose-lg p-6 max-w-none"
          />
        </EditorRoot>
      </div>

    </div>
  );
}
