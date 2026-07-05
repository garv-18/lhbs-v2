import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

async function seedTaxonomy() {
  const payload = await getPayload({ config: configPromise });
  
  await payload.create({
    collection: 'taxonomy',
    data: {
      keyword: 'Holistic Health',
      url: '/discover'
    }
  });

  console.log('Seeded Taxonomy with Holistic Health');
  process.exit(0);
}

seedTaxonomy();
