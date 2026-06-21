import CourseListClient from "../components/CourseListClient";
import "../globals.css";
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';

export const metadata = {
  title: 'All Programs | LHBS',
  description: 'Explore our catalog of martial arts training programs. Learn on your mobile with the best coaches.',
  alternates: {
    canonical: 'https://www.martialartsschool.in/courses',
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
  
  // Fetch courses for each category and optimize the payload
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
        depth: 1, // Only need depth 1 for basic image URL resolution
      });
      
      // Strip payload down to essentials to drastically reduce HTML document size for SEO/Performance
      const optimizedCourses = coursesRes.docs.map(course => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        price: course.price,
        description: course.description || null,
        image: course.image ? { url: course.image.url || course.image } : null
      }));

      return { 
        id: category.id,
        title: category.title,
        slug: category.slug,
        courses: optimizedCourses 
      };
    })
  );

  // Build ItemList JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": categoriesWithCourses.flatMap(c => c.courses).map((course, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://www.martialartsschool.in/courses/${course.category ? (course.category).slug : ''}/${course.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-background text-text pb-20 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Courses List with Sidebar */}
      <CourseListClient categories={categoriesWithCourses} />
    </div>
  );
}