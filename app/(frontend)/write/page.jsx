import React from 'react';
import { cookies } from "next/headers";
import NovelEditor from './Editor';
import LoginForm from './LoginForm';
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const metadata = {
  title: 'Write a Post | LHBS',
};

export default async function WritePage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("admin_write_access")?.value === "true";

  if (!hasAccess) {
    return <LoginForm />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${manrope.className}`}>
      <NovelEditor />
    </div>
  );
}
