import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

// Standard headers to prevent blocking
const headers = {
  'User-Agent': 'LHBS-Glossary-Bot/1.0 (https://www.martialartsschool.in; admin@martialartsschool.in) Node.js/18'
};

const INITIAL_CATEGORIES = [
  'Category:Martial_arts_terminology',
  'Category:Chinese_martial_arts_terms',
  'Category:Japanese_martial_arts_terms'
];

async function fetchCategoryMembers(category, depth = 0, maxDepth = 2) {
  if (depth > maxDepth) return [];
  console.log(`[Depth ${depth}] Fetching members for ${category}...`);
  
  let allMembers = [];
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(category)}&cmlimit=500&format=json`;
    const res = await fetch(url, { headers });
    const data = await res.json();
    
    if (!data.query || !data.query.categorymembers) return [];
    
    for (const member of data.query.categorymembers) {
      if (member.ns === 14) {
        // It's a subcategory
        const subMembers = await fetchCategoryMembers(member.title, depth + 1, maxDepth);
        allMembers = allMembers.concat(subMembers);
      } else if (member.ns === 0) {
        // It's an article
        allMembers.push(member);
      }
    }
  } catch (err) {
    console.log(`Error fetching category ${category}:`, err.message);
  }
  return allMembers;
}

async function fetchExtract(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(title)}&format=json`;
  const res = await fetch(url, { headers });
  
  if (res.status === 429) {
    console.log("Rate limited! Waiting 5 seconds...");
    await new Promise(r => setTimeout(r, 5000));
    return fetchExtract(title);
  }

  const data = await res.json();
  const pages = data.query?.pages;
  if (!pages) return null;
  const pageId = Object.keys(pages)[0];
  return pages[pageId].extract;
}

function cleanExtract(text) {
  if (!text) return null;
  let cleaned = text.replace(/\s*\[.*?\]\s*/g, ' ').replace(/\s*\(.*?\)\s*/g, ' ');
  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();
  return cleaned;
}

async function scrapeWikipedia() {
  console.log('Initializing Wikipedia Scraper...');
  const payload = await getPayload({ config: configPromise });

  let allMembers = [];
  for (const cat of INITIAL_CATEGORIES) {
    const members = await fetchCategoryMembers(cat, 0, 1); // Depth 1 fetches subcategories once
    allMembers = allMembers.concat(members);
  }

  const uniqueTitles = [...new Set(allMembers.map(m => m.title))];
  console.log(`Found ${uniqueTitles.length} unique terms. Starting scrape...`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const title of uniqueTitles) {
    try {
      const cleanTitle = title.replace(/\s*\(.*?\)\s*/g, '').trim();

      const existing = await payload.find({
        collection: 'glossary',
        where: { term: { equals: cleanTitle } }
      });

      if (existing.totalDocs > 0) {
        console.log(`[SKIP] "${cleanTitle}" already exists.`);
        skipCount++;
        continue;
      }

      // Very polite delay
      await new Promise(r => setTimeout(r, 2000));

      const extract = await fetchExtract(title);
      const definition = cleanExtract(extract);

      if (!definition || definition.length < 50 || definition.toLowerCase().includes("may refer to")) {
        console.log(`[IGNORE] "${cleanTitle}" - definition too short, empty, or disambiguation.`);
        skipCount++;
        continue;
      }

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
                  text: definition,
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

      const metaTitle = `${cleanTitle} - Martial Arts Glossary`;
      const metaDescription = definition.substring(0, 150) + '...';

      await payload.create({
        collection: 'glossary',
        data: {
          term: cleanTitle,
          definition: definitionLexical,
          metaTitle,
          metaDescription
        }
      });

      console.log(`[SUCCESS] Added: ${cleanTitle}`);
      successCount++;
    } catch (error) {
      console.log(`[ERROR] Failed on ${title}: ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n=== Scraping Complete ===`);
  console.log(`Successfully Added: ${successCount}`);
  console.log(`Skipped/Ignored: ${skipCount}`);
  console.log(`Errors: ${errorCount}`);
  process.exit(0);
}

scrapeWikipedia();
