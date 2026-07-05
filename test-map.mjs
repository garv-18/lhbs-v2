import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';
import { getLinkingDictionary } from './app/(frontend)/utils/injectLinks.js';

async function testMap() {
  const payload = await getPayload({ config: configPromise });
  const dictionary = await getLinkingDictionary(payload);
  
  const sortedDict = [...dictionary].sort((a, b) => b.keyword.length - a.keyword.length);

  const dictMap = new Map();
  sortedDict.forEach(entry => {
    const lowerKey = entry.keyword.toLowerCase();
    if (!dictMap.has(lowerKey)) {
      dictMap.set(lowerKey, entry.url);
    } else {
      console.log(`Conflict! Keyword: "${lowerKey}". Keeping: ${dictMap.get(lowerKey)}, Ignoring: ${entry.url}`);
    }
  });
  
  console.log('Chi Energy links to:', dictMap.get('chi energy'));
  console.log('18 Hands links to:', dictMap.get('18 hands of lohan'));

  process.exit(0);
}

testMap();
