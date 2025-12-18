"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Manrope, Cinzel } from "next/font/google";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail, Phone } from "lucide-react";
import TextureBackground from "../components/TextureBackground";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

function PaymentSuccessContent() {
  const query = useSearchParams();
  const course = query.get("course") || "Your Course";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <TextureBackground />

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div
        className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative z-10 text-center"
        data-aos="zoom-in"
      >
        <div className="mx-auto w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8 border border-green-500/30">
          <CheckCircle2 size={48} className="text-green-500 animate-pulse" />
        </div>

        <h1 className={`text-3xl md:text-5xl font-bold mb-4 text-white ${cinzel.className}`}>
          Payment Successful!
        </h1>

        <p className={`text-xl text-[#FD5D2F] font-bold mb-6 ${manrope.className}`}>
          Welcome to the {course}
        </p>

        <p className={`text-gray-300 text-lg leading-relaxed mb-8 ${manrope.className}`}>
          Thank you for joining us. Your journey to mastery begins now.
          <br className="hidden md:block" />
          We will contact you shortly with your course access details and next steps.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left space-y-4">
          <h3 className={`text-white font-bold mb-2 ${cinzel.className}`}>Have Questions?</h3>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex items-center gap-3 text-gray-400">
              <div className="bg-[#25D366]/20 p-2 rounded-full text-[#25D366]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /></svg>
              </div>
              <a href="https://wa.me/919713600085?text=Hi%2C%20I%20have%20successfully%20paid%20for%20the%20course.%20Please%20guide%20me%20further." target="_blank" rel="noopener noreferrer" className={`hover:text-white transition-colors ${manrope.className}`}>
                Chat on WhatsApp (+91-9713600085)
              </a>
            </div>

          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-bold tracking-wide hover:bg-white/20 transition-all">
              Back to Home
            </button>
          </Link>
          <Link href={`/access/${course}`}>
            <button className="group px-8 py-3 rounded-full bg-gradient-to-r from-[#C8295E] to-[#FD5D2F] text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(253,93,47,0.4)] transition-all flex items-center justify-center gap-2">
              Start Learning
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}