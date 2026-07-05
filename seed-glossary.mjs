import 'dotenv/config';
import fs from 'fs';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

async function seedGlossary() {
  const payload = await getPayload({ config: configPromise });
  
  // Read JSON
  const data = JSON.parse(fs.readFileSync('./glossary-data.json', 'utf8'));
  
  console.log(`Starting to seed ${data.length} Glossary terms...`);
  
  let successCount = 0;
  let skipCount = 0;

  for (const item of data) {
    // Check if it already exists
    const existing = await payload.find({
      collection: 'glossary',
      where: { term: { equals: item.term } }
    });

    if (existing.totalDocs > 0) {
      console.log(`Skipping "${item.term}" (Already exists)`);
      skipCount++;
      continue;
    }

    // Build Lexical AST for definition
    const definitionLexical = {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                type: 'text',
                text: item.definition,
                format: 0,
                style: '',
                detail: 0,
                version: 1
              }
            ]
          }
        ]
      }
    };

    // Auto-generate meta tags
    const metaTitle = `${item.term} - Martial Arts Glossary`;
    const metaDescription = item.definition.substring(0, 150) + '...';

    await payload.create({
      collection: 'glossary',
      data: {
        term: item.term,
        definition: definitionLexical,
        metaTitle,
        metaDescription
      }
    });

    console.log(`Added: ${item.term}`);
    successCount++;
  }

  console.log(`Finished Seeding. Added: ${successCount}. Skipped: ${skipCount}.`);
  process.exit(0);
}

seedGlossary();
