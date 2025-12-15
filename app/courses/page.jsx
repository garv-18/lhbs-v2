import { Cinzel, Manrope } from "next/font/google";
import TextureBackground from "../components/TextureBackground";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import "../globals.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500"] });

const courses = [
  {
    title: "Muay Thai",
    description: "Learn one of the world’s deadliest martial arts to protect yourself with confidence and precision.",
    image: "https://ik.imagekit.io/lhbs/muay-thai.png?updatedAt=1751458719255",
    link: "/coursename/muaythai"
  },
  {
    title: "Kung-fu",
    description: "Master traditional Kung-fu techniques, tricks, and styles from Bharat’s top coach—right from your phone.",
    image: "https://ik.imagekit.io/lhbs/kung-fu.png?updatedAt=1751458720326",
    link: "/coursename/kungfu"
  },
  {
    title: "Krav Maga",
    description: "Train in real-life combat techniques to fight off attackers using proven science and psychology.",
    image: "https://ik.imagekit.io/lhbs/krav-maga.png?updatedAt=1751458718291",
    link: "/coursename/kravmaga"
  },
  {
    title: "Capoeira",
    description: "Blend rhythm, movement, and defense with this dynamic Brazilian martial art—taught step by step.",
    image: "https://ik.imagekit.io/lhbs/capoeira.png?updatedAt=1751458719046",
    link: "/coursename/capoeira"
  },
  {
    title: "Tai-chi",
    description: "Balance body and mind while gaining powerful internal strength with calming Tai-chi techniques.",
    image: "https://ik.imagekit.io/lhbs/tai-chi.png?updatedAt=1751458718173",
    link: "/coursename/taichi"
  },
  {
    title: "Muscles Building",
    description: "Build real muscle at home with daily challenges—no gym, no excuses, just results in 25 days.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
    link: "/coursename/musclesbuilding"
  },
  {
    title: "Diet & Nutrition",
    description: "Reboot your body with a 25-day detox, home remedies, and nutrition plans that suit every lifestyle.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
    link: "/coursename/dietandnutrition"
  },
  {
    title: "Road Fight",
    description: "Don’t have time for full training? Learn effective, easy-to-remember moves for real-world self-defense.",
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop",
    link: "/coursename/roadfight"
  },
  {
    title: "Tiger Style Kung-fu",
    description: "Unleash your inner strength and emotional control with this fierce and disciplined animal style.",
    image: "https://ik.imagekit.io/lhbs/tiger-style.png?updatedAt=1751458718375",
    link: "/coursename/tigerstylekungfu"
  },
  {
    title: "Eagle Style Kung-fu",
    description: "Focused, fast, and brutal—train to react quickly and powerfully in emergency situations.",
    image: "https://ik.imagekit.io/lhbs/eagle-style.png?updatedAt=1751458716362",
    link: "/coursename/eaglestylekungfu"
  },
  {
    title: "Snake Style Kung-fu",
    description: "Perfect your agility and precision to counter group attacks with snake-like speed and strategy.",
    image: "https://ik.imagekit.io/lhbs/snake-style%20.png?updatedAt=1751458718560",
    link: "/coursename/snakestylekungfu"
  },
  {
    title: "Height Grow Formula",
    description: "Naturally increase your height in 90 days with a proven, organic method—no medicine involved.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    link: "/coursename/heightgrowformula"
  },
  {
    title: "Weight Loss Formula",
    description: "Shed 15% of your body weight in just 25 days—guaranteed—through customized diet and training.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    link: "/coursename/weightlossformula"
  },
  {
    title: "Eye Healing Formula",
    description: "Restore your eye health naturally in just 25 days, without medication—designed for screen users.",
    image: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?q=80&w=2009&auto=format&fit=crop",
    link: "/coursename/eyehealingformula"
  },
  {
    title: "Spirituality Guide",
    description: "Discover inner peace and alignment of mind, body, and nature through a 25-day spiritual transformation.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop",
    link: "/coursename/spirituality"
  },
];

const features = [
  "24X7 Course Access",
  "Class Group Chat",
  "10 Year Community ship",
  "Live Classes on Zoom",
  "Certification Through Test"
];

export default function Courses() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FD5D2F] selection:text-white">
      <TextureBackground />

      {/* Header Section */}
      <div className="relative pt-40 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C8295E] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

        <h1
          className={`text-5xl md:text-7xl font-bold tracking-tighter mb-6 ${cinzel.className}`}
          data-aos="zoom-in"
        >
          LEARN FROM THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8295E] via-[#F81F24] to-[#FD5D2F]">
            BEST, BE YOUR BEST
          </span>
        </h1>

        <p
          className={`max-w-3xl mx-auto text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-12 ${manrope.className}`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Learn on your mobile, without going anywhere, without paying high fees.
          Get training from Bharat’s best coach with different levels and styles available step by step.
        </p>

        {/* Features List */}
        <div
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {features.map((feature, idx) => (
            <div key={idx} className={`flex items-center gap-2 text-[#FD5D2F] ${manrope.className}`}>
              <CheckCircle2 size={20} />
              <span className="text-white/90 font-light">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              {/* Image */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8 relative z-20">
                <h3 className={`text-2xl font-bold mb-3 text-white group-hover:text-[#FD5D2F] transition-colors ${cinzel.className}`}>
                  {course.title}
                </h3>
                <p className={`text-gray-400 font-light text-sm leading-relaxed mb-6 ${manrope.className}`}>
                  {course.description}
                </p>

                <a
                  href={course.link}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white group-hover:gap-3 transition-all duration-300"
                >
                  <span className="uppercase tracking-widest text-xs font-bold">Start Learning</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}