import TestCourseListClient from "./TestCourseListClient";
import "../globals.css";
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import ReviewCarousel from "../components/ReviewCarousel";

export const metadata = {
  title: 'Test Courses | LHBS',
};

export default async function TestCourses() {
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

  // Fetch Reviews
  const reviewsRes = await payload.find({
    collection: 'reviews',
    sort: '-createdAt',
    limit: 20,
  });
  const reviews = reviewsRes.docs;

  return (
    <div className="min-h-screen bg-white text-black pb-20 pt-28">
      {/* Courses List with Variant 15 connected timeline design */}
      <TestCourseListClient categories={categoriesWithCourses} />

      {/* Dynamic Google Reviews */}
      <div className="bg-gray-50 border-t border-gray-100 py-12">
        <ReviewCarousel reviews={reviews} />
      </div>
    </div>
  );
}
