"use server";

import { cookies } from "next/headers";

export async function loginToEditor(username, password) {
  const validUser = "admin";
  const validPass = process.env.ADMIN_WRITE_PASSWORD || "masterpramod";

  if (username === validUser && password === validPass) {
    // Set a secure, HTTP-only cookie that lasts for 30 days
    const cookieStore = await cookies();
    cookieStore.set("admin_write_access", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
    
    return { success: true };
  }
  
  return { success: false, error: "Invalid username or password" };
}
