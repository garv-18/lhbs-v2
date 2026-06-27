import Hero from "./components/Hero";
import Programs from "./components/Programs";
import Training from "./components/Training";
import TextureBackground from "./components/TextureBackground";
import AboutMaster from "./components/AboutMaster";
import CategoryCarousel from "./components/CategoryCarousel";
import ReviewCarousel from "./components/ReviewCarousel";
import { getPayload } from 'payload';
import configPromise from '../../payload.config';

export const metadata = {
  title: "LHBS - Live Healthy Be Safe",
  description: "Learn Martial Arts from the best. Expert training in Muay Thai, Kung-fu, Krav Maga, and more.",
};

export const revalidate = 60; // Cache home page for 1 minute

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch categories
  const categoriesRes = await payload.find({
    collection: 'categories',
    sort: 'rank',
    limit: 10,
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
        limit: 10,
      });
      return { ...category, courses: coursesRes.docs };
    })
  );

  // Fetch Reviews
  const reviewsRes = await payload.find({
    collection: 'reviews',
    sort: '-createdAt',
    limit: 20,
  });
  const reviews = reviewsRes.docs;

  // Fetch Homepage Media
  let homepageMedia = null;
  try {
    homepageMedia = await payload.findGlobal({
      slug: 'homepage-media',
    });
  } catch (error) {
    console.error("Error fetching homepage media:", error);
  }

  return (
    <>
      <main className="min-h-screen bg-background text-text overflow-x-hidden w-full max-w-[100vw]">
        <Hero media={homepageMedia} />
        <Programs media={homepageMedia} />
        {categoriesWithCourses.map(category => (
          category.courses.length > 0 && (
            <CategoryCarousel 
              key={category.id} 
              category={category} 
              courses={category.courses} 
            />
          )
        ))}
        <AboutMaster media={homepageMedia} />
        <ReviewCarousel reviews={reviews} />
        <Training media={homepageMedia} />
      </main>
    </>
  );
}
