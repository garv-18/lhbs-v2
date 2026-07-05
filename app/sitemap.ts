import { getPayload } from 'payload';
import configPromise from '../payload.config';

export default async function sitemap() {
  const baseUrl = 'https://www.martialartsschool.in';

  // Base routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/courses',
    '/joinus',
    '/signup',
    '/blog',
    '/discover',
    '/privacypolicy',
    '/refundpolicy',
    '/termsandconditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const payload = await getPayload({ config: configPromise });

  const [categoriesRes, coursesRes, blogRes, nichesRes, audiencesRes, glossaryRes] = await Promise.all([
    payload.find({ collection: 'categories', limit: 100, select: { slug: true } }),
    payload.find({ collection: 'coursenames', limit: 1000, depth: 1, select: { slug: true, category: true } }),
    payload.find({ collection: 'pages', limit: 1000, select: { slug: true } }),
    payload.find({ collection: 'pseo-niches', limit: 100, select: { slug: true } }),
    payload.find({ collection: 'pseo-audiences', limit: 100, select: { slug: true } }),
    payload.find({ collection: 'glossary', limit: 1000, select: { slug: true, updatedAt: true } }),
  ]);
  
  const categoryRoutes = categoriesRes.docs.map((category) => ({
    url: `${baseUrl}/courses/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));
  
  const courseRoutes = coursesRes.docs
    .filter(course => course.category && (course.category as any).slug)
    .map((course) => ({
      url: `${baseUrl}/courses/${(course.category as any).slug}/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));
  
  const blogRoutes = blogRes.docs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const glossaryRoutes = glossaryRes.docs.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    lastModified: term.updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

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

  return [...routes, ...categoryRoutes, ...courseRoutes, ...blogRoutes, ...pseoRoutes, ...glossaryRoutes];
}
