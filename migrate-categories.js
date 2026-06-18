import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config';
import { masterCourses, regularCourses } from './app/(frontend)/utils/courseData.js';

async function migrateCategories() {
  const payload = await getPayload({ config: configPromise });

  console.log('Creating categories...');
  
  // 1. Create or find Master Program
  let masterCategoryRes = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'master-program' } }
  });
  
  let masterCategory;
  if (masterCategoryRes.docs.length > 0) {
    masterCategory = masterCategoryRes.docs[0];
  } else {
    masterCategory = await payload.create({
      collection: 'categories',
      data: {
        title: 'Master Program',
        slug: 'master-program',
        targetPage: '/courses',
        rank: 1,
      }
    });
  }

  // 2. Create or find Fundamentals Course (Regular)
  let regularCategoryRes = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'fundamentals-course' } }
  });
  
  let regularCategory;
  if (regularCategoryRes.docs.length > 0) {
    regularCategory = regularCategoryRes.docs[0];
  } else {
    regularCategory = await payload.create({
      collection: 'categories',
      data: {
        title: 'Fundamentals Course',
        slug: 'fundamentals-course',
        targetPage: '/courses',
        rank: 2,
      }
    });
  }

  console.log('Categories ready. Mapping courses...');

  const masterSlugs = masterCourses.map(c => c.slug);
  const regularSlugs = regularCourses.map(c => c.slug);

  const allCoursesRes = await payload.find({
    collection: 'coursenames',
    limit: 100,
  });

  let updatedCount = 0;

  for (const course of allCoursesRes.docs) {
    let categoryId = null;
    if (masterSlugs.includes(course.slug)) {
      categoryId = masterCategory.id;
    } else if (regularSlugs.includes(course.slug)) {
      categoryId = regularCategory.id;
    }

    if (categoryId) {
      // Check if it already has this category to avoid unnecessary updates
      if (typeof course.category === 'object' && course.category?.id === categoryId) continue;
      if (course.category === categoryId) continue;

      try {
        await payload.update({
          collection: 'coursenames',
          id: course.id,
          data: {
            category: categoryId,
          }
        });
        console.log(`Updated ${course.title} with category`);
        updatedCount++;
      } catch (err) {
        console.error(`Failed to update ${course.title}:`, err.message);
      }
    }
  }

  console.log(`Done! Updated ${updatedCount} courses.`);
  process.exit(0);
}

migrateCategories().catch(err => {
  console.error(err);
  process.exit(1);
});
