import { getPayload } from 'payload';
import configPromise from '../payload.config';

export default async function sitemap() {
  const baseUrl = 'https://masterpramod.com';

  // Base routes
  const routes = [
    '',
    '/courses',
    '/joinus',
    '/refundpolicy',
    '/termsandconditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const payload = await getPayload({ config: configPromise });

  // Dynamically fetch all categories for category pages
  const categoriesRes = await payload.find({
    collection: 'categories',
    limit: 100,
    select: { slug: true }
  });
  
  const categoryRoutes = categoriesRes.docs.map((category) => ({
    url: `${baseUrl}/courses/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Fetch all courses and populate their category to build correct nested routes
  const coursesRes = await payload.find({
    collection: 'coursenames',
    limit: 1000,
    depth: 1, // Need depth 1 to get category slug
    select: { slug: true, category: true }
  });
  
  const courseRoutes = coursesRes.docs
    .filter(course => course.category && (course.category as any).slug)
    .map((course) => ({
      url: `${baseUrl}/courses/${(course.category as any).slug}/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

  return [...routes, ...categoryRoutes, ...courseRoutes];
}
