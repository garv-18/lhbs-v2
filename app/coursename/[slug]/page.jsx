import { Cinzel, Manrope } from "next/font/google";
import TextureBackground from "../../components/TextureBackground";
import InstamojoButton from "../../components/InstamojoButton";
import { CheckCircle2, Shield, Zap, Award } from "lucide-react";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });

// Hardcoded data to bypass DB connection requirement
const courses = [
  {
    title: "Muay Thai",
    description: "Learn one of the world’s deadliest martial arts to protect yourself with confidence and precision. Master the art of eight limbs.",
    price: 10,
    slug: "muaythai",
    image: "https://ik.imagekit.io/lhbs/muay-thai.png?updatedAt=1751458719255",
    features: ["Elbow & Knee Strikes", "Clinch Work", "Sparring Drills", "Conditioning"]
  },
  {
    title: "Kung-fu",
    description: "Master traditional Kung-fu techniques, tricks, and styles from Bharat’s top coach—right from your phone.",
    price: 47500,
    slug: "kungfu",
    image: "https://ik.imagekit.io/lhbs/kung-fu.png?updatedAt=1751458720326",
    features: ["Animal Styles", "Weapon Training", "Flexibility", "Meditation"]
  },
  {
    title: "Krav Maga",
    description: "Train in real-life combat techniques to fight off attackers using proven science and psychology.",
    price: 47500,
    slug: "kravmaga",
    image: "https://ik.imagekit.io/lhbs/krav-maga.png?updatedAt=1751458718291",
    features: ["Street Defense", "Weapon Disarm", "Multiple Attackers", "Situational Awareness"]
  },
  {
    title: "Capoeira",
    description: "Blend rhythm, movement, and defense with this dynamic Brazilian martial art—taught step by step.",
    price: 47500,
    slug: "capoeira",
    image: "https://ik.imagekit.io/lhbs/capoeira.png?updatedAt=1751458719046",
    features: ["Acrobatics", "Music & Rhythm", "Fluid Movement", "Kicks & Sweeps"]
  },
  {
    title: "Tai-chi",
    description: "Balance body and mind while gaining powerful internal strength with calming Tai-chi techniques.",
    price: 47500,
    slug: "taichi",
    image: "https://ik.imagekit.io/lhbs/tai-chi.png?updatedAt=1751458718173",
    features: ["Breath Control", "Slow Movement", "Internal Power", "Stress Relief"]
  },
  {
    title: "Muscles Building",
    description: "Build real muscle at home with daily challenges—no gym, no excuses, just results in 25 days.",
    price: 47500,
    slug: "musclesbuilding",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
    features: ["Home Workouts", "Diet Plan", "Progress Tracking", "No Equipment Needed"]
  },
  {
    title: "Diet & Nutrition",
    description: "Reboot your body with a 25-day detox, home remedies, and nutrition plans that suit every lifestyle.",
    price: 47500,
    slug: "dietandnutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
    features: ["Detox Plans", "Custom Diets", "Healthy Recipes", "Lifestyle Tips"]
  },
  {
    title: "Road Fight",
    description: "Don’t have time for full training? Learn effective, easy-to-remember moves for real-world self-defense.",
    price: 47500,
    slug: "roadfight",
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop",
    features: ["Quick Strikes", "Escape Moves", "Psychology", "Legal Awareness"]
  },
  {
    title: "Tiger Style Kung-fu",
    description: "Unleash your inner strength and emotional control with this fierce and disciplined animal style.",
    price: 47500,
    slug: "tigerstylekungfu",
    image: "https://ik.imagekit.io/lhbs/tiger-style.png?updatedAt=1751458718375",
    features: ["Claw Techniques", "Power Generation", "Aggressive Defense", "Stance Work"]
  },
  {
    title: "Eagle Style Kung-fu",
    description: "Focused, fast, and brutal—train to react quickly and powerfully in emergency situations.",
    price: 47500,
    slug: "eaglestylekungfu",
    image: "https://ik.imagekit.io/lhbs/eagle-style.png?updatedAt=1751458716362",
    features: ["Grip Strength", "Precision Strikes", "Joint Locks", "Speed Training"]
  },
  {
    title: "Snake Style Kung-fu",
    description: "Perfect your agility and precision to counter group attacks with snake-like speed and strategy.",
    price: 47500,
    slug: "snakestylekungfu",
    image: "https://ik.imagekit.io/lhbs/snake-style%20.png?updatedAt=1751458718560",
    features: ["Vital Points", "Evasion", "Counter Attacks", "Flexibility"]
  },
  {
    title: "Height Grow Formula",
    description: "Naturally increase your height in 90 days with a proven, organic method—no medicine involved.",
    price: 47500,
    slug: "heightgrowformula",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    features: ["Stretching Exercises", "Nutrition Guide", "Posture Correction", "Sleep Optimization"]
  },
  {
    title: "Weight Loss Formula",
    description: "Shed 15% of your body weight in just 25 days—guaranteed—through customized diet and training.",
    price: 47500,
    slug: "weightlossformula",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    features: ["Fat Burning Workouts", "Calorie Deficit Plan", "Metabolism Boost", "Daily Support"]
  },
  {
    title: "Eye Healing Formula",
    description: "Restore your eye health naturally in just 25 days, without medication—designed for screen users.",
    price: 47500,
    slug: "eyehealingformula",
    image: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?q=80&w=2009&auto=format&fit=crop",
    features: ["Eye Exercises", "Diet for Vision", "Screen Habits", "Relaxation Techniques"]
  },
  {
    title: "Spirituality Guide",
    description: "Discover inner peace and alignment of mind, body, and nature through a 25-day spiritual transformation.",
    price: 47500,
    slug: "spirituality",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop",
    features: ["Meditation", "Mindfulness", "Philosophy", "Inner Peace"]
  },
];

export default async function CoursePage({ params }) {
  // Await params for Next.js 15 compatibility
  const { slug } = await params;

  // Find course by slug from hardcoded data
  const course = courses.find(c => c.slug === slug);

  if (!course) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
      <h1 className={`text-2xl ${cinzel.className}`}>Course Not Found</h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FD5D2F] selection:text-white">
      <TextureBackground />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#0a0a0a] z-10"></div>
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="max-w-7xl mx-auto">
            <span className={`inline-block px-4 py-1 mb-4 rounded-full bg-[#FD5D2F]/20 border border-[#FD5D2F]/30 text-[#FD5D2F] text-sm font-bold tracking-widest uppercase ${manrope.className}`}>
              Premium Course
            </span>
            <h1 className={`text-5xl md:text-7xl font-bold mb-4 text-white ${cinzel.className}`}>
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Description & Features */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10">
              <h2 className={`text-3xl font-bold mb-6 text-white ${cinzel.className}`}>About This Course</h2>
              <p className={`text-gray-300 text-lg leading-relaxed ${manrope.className}`}>
                {course.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.features && course.features.map((feature, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 transition-colors">
                  <div className="bg-[#FD5D2F]/20 p-3 rounded-full text-[#FD5D2F]">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold text-white mb-1 ${manrope.className}`}>{feature}</h3>
                    <p className="text-sm text-gray-400">Master this essential skill.</p>
                  </div>
                </div>
              ))}
              {!course.features && (
                <>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                    <div className="bg-[#FD5D2F]/20 p-3 rounded-full text-[#FD5D2F]"><Shield size={24} /></div>
                    <div><h3 className="text-lg font-bold text-white">Self Defense</h3><p className="text-sm text-gray-400">Protect yourself in any situation.</p></div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                    <div className="bg-[#FD5D2F]/20 p-3 rounded-full text-[#FD5D2F]"><Zap size={24} /></div>
                    <div><h3 className="text-lg font-bold text-white">Speed & Power</h3><p className="text-sm text-gray-400">Enhance your physical capabilities.</p></div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Pricing Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <p className={`text-gray-400 text-sm uppercase tracking-widest mb-2 ${manrope.className}`}>One-Time Payment</p>
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-5xl font-bold text-white ${cinzel.className}`}>₹47,500</span>
                  <span className="text-gray-500 line-through text-xl">₹{course.price + 2000}</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  <Award size={16} />
                  <span>Certified Course</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-gray-300 text-sm border-b border-white/10 pb-3">
                  <span>Duration</span>
                  <span className="font-bold text-white">Lifetime Access</span>
                </div>
                <div className="flex items-center justify-between text-gray-300 text-sm border-b border-white/10 pb-3">
                  <span>Level</span>
                  <span className="font-bold text-white">All Levels</span>
                </div>
                <div className="flex items-center justify-between text-gray-300 text-sm border-b border-white/10 pb-3">
                  <span>Language</span>
                  <span className="font-bold text-white">English / Hindi</span>
                </div>
              </div>

              <InstamojoButton
                amount={course.price}
                courseSlug={slug}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C8295E] to-[#FD5D2F] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(253,93,47,0.4)] transition-all duration-300 transform hover:-translate-y-1"
              />

              <p className="text-center text-xs text-gray-500 mt-4">
                30-Day Money-Back Guarantee • Secure Payment
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}