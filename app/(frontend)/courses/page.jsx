import { Cinzel, Manrope } from "next/font/google";
import TextureBackground from "../components/TextureBackground";
import GridCategory from "../components/GridCategory";
import { CheckCircle2 } from "lucide-react";
import "../globals.css";
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500"] });

const features = [
  "24X7 Course Access",
  "Class Group Chat",
  "10 Year Community ship",
  "Live Classes on Zoom",
  "Certification Through Test"
];

export default async function Courses() {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch categories
  const categoriesRes = await payload.find({
    collection: 'categories',
    sort: 'rank',
    limit: 100,
  });
  
  const categories = categoriesRes.docs;
  
  // Fetch courses for each category
  const categoriesWithCourses = await Promise.all(
    categories.map(async (category) => {
      const coursesRes = await payload.find({
        collection: 'coursenames',
        where: {
          category: {
            equals: category.id,
          },
        },
        limit: 8, // limit to 8 for grid display
      });
      return { ...category, courses: coursesRes.docs };
    })
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FD5D2F] selection:text-white pb-20">
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

      {/* Categories Grid */}
      {categoriesWithCourses.map(category => (
        category.courses.length > 0 && (
          <GridCategory 
            key={category.id} 
            category={category} 
            courses={category.courses} 
          />
        )
      ))}
    </div>
  );
}