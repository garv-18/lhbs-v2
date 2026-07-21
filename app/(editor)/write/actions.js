"use server";

import { cookies, headers } from "next/headers";

// Simple in-memory rate limiting store for login attempts
// In production across multiple serverless functions, this would reset on cold starts,
// but for a single-admin login page, it's highly effective against rapid brute force.
const rateLimitMap = new Map();

export async function loginToEditor(username, password) {
  // 1. Rate Limiting Check
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown_ip";
  
  const currentTime = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, expiresAt: 0 };

  // If currently locked out
  if (record.count >= 5 && currentTime < record.expiresAt) {
    const minutesLeft = Math.ceil((record.expiresAt - currentTime) / 60000);
    return { 
      success: false, 
      error: `Too many failed attempts. Please try again in ${minutesLeft} minute(s).` 
    };
  }

  // Reset count if the lockout period has expired
  if (currentTime > record.expiresAt) {
    record.count = 0;
  }

  // 2. Highly Secure Password Verification
  const validUser = "admin";
  // Added a highly secure default password:
  const validPass = process.env.ADMIN_WRITE_PASSWORD || "Pramod@LHBS2026!Secure_Blog";

  if (username === validUser && password === validPass) {
    // Success! Clear their failure record.
    rateLimitMap.delete(ip);

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
  
  // 3. Failed Attempt Logging
  record.count += 1;
  record.expiresAt = currentTime + 15 * 60 * 1000; // 15 minute lockout after 5 failures
  rateLimitMap.set(ip, record);

  const attemptsLeft = 5 - record.count;
  
  if (attemptsLeft <= 0) {
    return { success: false, error: "Too many failed attempts. You are locked out for 15 minutes." };
  }

  return { success: false, error: `Invalid credentials. ${attemptsLeft} attempt(s) remaining.` };
}
