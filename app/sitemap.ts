import { getPayload } from 'payload';
import configPromise from '../payload.config';

export default async function sitemap() {
  const baseUrl = 'https://www.martialartsschool.in';

  // Base routes
  const routes = [
    '',
    '/courses',
    '/joinus',
    '/blog',
    '/discover',
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

  // Fetch all blog pages
  const blogRes = await payload.find({
    collection: 'pages',
    limit: 1000,
    select: { slug: true }
  });
  
  const blogRoutes = blogRes.docs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Fetch pSEO pages (Niches x Audiences)
  const nichesRes = await payload.find({ collection: 'pseo-niches', limit: 100, select: { slug: true } });
  const audiencesRes = await payload.find({ collection: 'pseo-audiences', limit: 100, select: { slug: true } });
  
  const pseoRoutes: any[] = [];
  for (const niche of nichesRes.docs) {
    for (const audience of audiencesRes.docs) {
      pseoRoutes.push({
        url: `${baseUrl}/discover/${niche.slug}/${audience.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return [...routes, ...categoryRoutes, ...courseRoutes, ...blogRoutes, ...pseoRoutes];
}
