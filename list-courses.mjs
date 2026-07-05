import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

async function listCourses() {
  const payload = await getPayload({ config: configPromise });
  const courses = await payload.find({
    collection: 'coursenames',
    limit: 1000,
    select: { title: true }
  });
  
  console.log("Course Titles in Database:");
  courses.docs.forEach(c => console.log(`- ${c.title}`));
  process.exit(0);
}

listCourses();
