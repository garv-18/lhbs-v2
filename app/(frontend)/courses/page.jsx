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
      });
      return { ...category, courses: coursesRes.docs };
    })
  );

  return (
    <div className="min-h-screen bg-background text-text pb-20">
      {/* Header Section */}
      <div className="relative pt-32 pb-16 px-4 text-center overflow-hidden bg-gray-50 border-b border-gray-100">
        <h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-text"
          data-aos="zoom-in"
        >
          Learn from the <br />
          <span className="text-primary">
            Best, Be Your Best
          </span>
        </h1>

        <p
          className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed mb-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Learn on your mobile, without going anywhere, without paying high fees.
          Get training from Bharat’s best coach with different levels and styles available step by step.
        </p>

        {/* Features List */}
        <div
          className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="400"
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