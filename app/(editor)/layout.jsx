import React from 'react';

// Zen Mode Editor Layout - No Navigation, No Footer
export default function EditorLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased selection:bg-black selection:text-white">
        <main>{children}</main>
      </body>
    </html>
  );
}
