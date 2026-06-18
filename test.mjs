import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

async function test() {
  const payload = await getPayload({ config: configPromise });
  const courses = await payload.find({
    collection: 'coursenames',
    limit: 5,
    depth: 1
  });
  console.log(JSON.stringify(courses.docs.map(c => ({ title: c.title, image: c.image })), null, 2));
  process.exit(0);
}
test();
