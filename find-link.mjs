import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

async function test() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({ collection: 'pages', limit: 10 });
  
  for (const p of pages.docs) {
    console.log(`Page: ${p.slug}`);
    // Find a link node recursively
    let found = false;
    function findLink(node) {
      if (node.type === 'link' || node.type === 'autolink') {
        console.log(JSON.stringify(node, null, 2));
        found = true;
      }
      if (node.children) {
        node.children.forEach(findLink);
      }
    }
    if (p.content && p.content.root) {
      findLink(p.content.root);
    }
  }
  process.exit(0);
}

test();
