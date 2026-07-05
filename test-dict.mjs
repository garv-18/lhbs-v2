import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

async function test() {
  const payload = await getPayload({ config: configPromise });
  const [coursesData, nichesData, audiencesData, taxonomyData] = await Promise.all([
    payload.find({ collection: 'coursenames', limit: 100, depth: 1, select: { title: true, slug: true, category: true } }),
    payload.find({ collection: 'pseo-niches', limit: 100, select: { name: true, slug: true } }),
    payload.find({ collection: 'pseo-audiences', limit: 100, select: { name: true, slug: true } }),
    payload.find({ collection: 'taxonomy', limit: 100, select: { keyword: true, url: true } })
  ]);

  let dictionary = [];
  
  if (taxonomyData && taxonomyData.docs) {
    dictionary = dictionary.concat(
      taxonomyData.docs.map(t => ({ keyword: t.keyword, url: t.url }))
    );
  }
  
  if (coursesData && coursesData.docs) {
    dictionary = dictionary.concat(
      coursesData.docs
        .filter(c => c.title && c.slug && c.category?.slug)
        .map(c => ({ keyword: c.title, url: `/courses/${c.category.slug}/${c.slug}` }))
    );
  }
  
  if (nichesData && audiencesData && nichesData.docs && audiencesData.docs) {
    for (const niche of nichesData.docs) {
      for (const audience of audiencesData.docs) {
        const keyword = `${niche.name} ${audience.name}`;
        dictionary.push({
          keyword,
          url: `/discover/${niche.slug}/${audience.slug}`
        });
      }
    }
  }

  console.log('--- Dictionary ---');
  console.log(dictionary.filter(d => d.keyword.includes('Holistic') || d.keyword.includes('Chi') || d.keyword.includes('18')));
  process.exit(0);
}

test();
