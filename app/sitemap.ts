import { getPayload } from 'payload';
import configPromise from '../payload.config';

export default async function sitemap() {
  const baseUrl = 'https://masterpramod.com';

  // Base routes
  const routes = [
    '',
    '/courses',
    '/courses/masterprogram',
    '/courses/programs',
    '/joinus',
    '/refundpolicy',
    '/termsandconditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Course dynamic routes
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'coursenames',
    limit: 100,
    depth: 0, // No need to fetch related media
    select: { slug: true }
  });
  const allCourses = data.docs;
  
  const courseRoutes = allCourses.map((course) => ({
    url: `${baseUrl}/coursename/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...routes, ...courseRoutes];
}
