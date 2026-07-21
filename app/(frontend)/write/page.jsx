import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import { redirect } from "next/navigation";
import NovelEditor from './Editor';
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const metadata = {
  title: 'Write a Post | LHBS',
};

export default async function WritePage() {
  const session = await getServerSession(authOptions);
  
  // Basic security: they must be logged in via Google/Github
  if (!session || !session.user) {
    // If not logged in, you could redirect to a login page, but we'll show a message
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <p className="text-gray-500 mb-6">You must be signed in to write a post.</p>
          <a href="/api/auth/signin" className="bg-black text-white px-6 py-2 rounded-full">Sign In</a>
        </div>
      </div>
    );
  }

  const allowedAdminEmails = [
    'pramod@martialartsschool.in',
    'garv@martialartsschool.in',
    'theestatecompany11@gmail.com' // You can tell me to add yours here
  ];

  if (!allowedAdminEmails.includes(session.user.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h1>
          <p className="text-gray-500 mb-6">Your email ({session.user.email}) is not authorized as an admin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${manrope.className}`}>
      <NovelEditor />
    </div>
  );
}
