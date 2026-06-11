import { masterCourses, regularCourses } from './(frontend)/utils/courseData';

export default function sitemap() {
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
  const allCourses = [...regularCourses, ...masterCourses];
  const courseRoutes = allCourses.map((course) => ({
    url: `${baseUrl}/coursename/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...routes, ...courseRoutes];
}
