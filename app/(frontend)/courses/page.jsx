import CourseListClient from "../components/CourseListClient";
import { CheckCircle2 } from "lucide-react";
import "../globals.css";
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';

const features = [
  "24X7 Course Access",
  "Class Group Chat",
  "10 Year Community ship",
  "Live Classes on Zoom",
  "Certification Through Test"
];

export const metadata = {
  title: 'All Programs | LHBS',
  description: 'Explore our catalog of martial arts training programs. Learn on your mobile with the best coaches.',
  alternates: {
    canonical: 'https://masterpramod.com/courses',
  },
};

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
        limit: 100, // fetch all for client side filtering
        depth: 2,
      });
      if (coursesRes.docs.length > 0) {
        console.log("COURSE IMAGE:", coursesRes.docs[0].image);
      }
      return { ...category, courses: coursesRes.docs };
    })
  );

  // Build ItemList JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": categoriesWithCourses.flatMap(c => c.courses).map((course, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://masterpramod.com/courses/${course.category ? (course.category).slug : ''}/${course.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-background text-text pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header Section */}
      <div className="relative pt-28 pb-8 px-4 text-center overflow-hidden bg-gray-50 border-b border-gray-100">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-text"
          data-aos="zoom-in"
          suppressHydrationWarning
        >
          Learn from the <br />
          <span className="text-primary">
            Best, Be Your Best
          </span>
        </h1>

        <p
          className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed mb-6"
          data-aos="fade-up"
          data-aos-delay="200"
          suppressHydrationWarning
        >
          Learn on your mobile, without going anywhere, without paying high fees.
          Get training from Bharat’s best coach with different levels and styles available step by step.
        </p>

        {/* Features List */}
        <div
          className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="400"
          suppressHydrationWarning
        >
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <CheckCircle2 size={18} className="text-primary" />
              <span className="text-gray-700 text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Courses List with Sidebar */}
      <CourseListClient categories={categoriesWithCourses} />
    </div>
  );
}