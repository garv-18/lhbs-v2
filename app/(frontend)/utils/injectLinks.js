// Utility to inject automated contextual links into Payload Lexical AST

export async function getLinkingDictionary(payload) {
  const [coursesData, nichesData, audiencesData, taxonomyData, glossaryData] = await Promise.all([
    payload.find({ collection: 'coursenames', limit: 100, depth: 1, select: { title: true, slug: true, category: true } }),
    payload.find({ collection: 'pseo-niches', limit: 100, select: { name: true, slug: true } }),
    payload.find({ collection: 'pseo-audiences', limit: 100, select: { name: true, slug: true } }),
    payload.find({ collection: 'taxonomy', limit: 100, select: { keyword: true, url: true } }),
    payload.find({ collection: 'glossary', limit: 1000, select: { term: true, slug: true } })
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
        dictionary.push({
          keyword: `${niche.name} ${audience.name}`,
          url: `/discover/${niche.slug}/${audience.slug}`
        });
      }
    }
  }

  if (glossaryData && glossaryData.docs) {
    dictionary = dictionary.concat(
      glossaryData.docs
        .filter(g => g.term && g.slug)
        .map(g => ({ keyword: g.term, url: `/glossary/${g.slug}` }))
    );
  }

  return dictionary;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function injectLinks(lexicalData, dictionary) {
  if (!lexicalData || !lexicalData.root) return lexicalData;

  // Clone data to avoid mutating original
  const data = JSON.parse(JSON.stringify(lexicalData));

  // Sort dictionary by keyword length descending to match "Chi Energy" before "Chi"
  const sortedDict = [...dictionary].sort((a, b) => b.keyword.length - a.keyword.length);

  if (sortedDict.length === 0) return data;

  // Build a single Regex to match any of the keywords
  // Using \b to ensure whole word match, but \b fails on non-word characters.
  // We'll use a dynamic regex.
  const dictMap = new Map();
  const patterns = [];
  
  for (const entry of sortedDict) {
    const lowerKey = entry.keyword.toLowerCase();
    // Only add if not already present (prevent duplicates)
    if (!dictMap.has(lowerKey)) {
      dictMap.set(lowerKey, entry.url);
      patterns.push(escapeRegExp(entry.keyword));
    }
  }

  // Regex: \b(keyword1|keyword2)\b
  // We use lookarounds to ensure word boundaries if possible, but standard \b is usually fine for alphanumeric keywords
  const regex = new RegExp(`\\b(${patterns.join('|')})\\b`, 'gi');

  function traverseAndReplace(node) {
    if (!node || !node.children) return;

    // Do not process text inside an existing link
    if (node.type === 'link') return;

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];

      if (child.type === 'text' && typeof child.text === 'string') {
        const text = child.text;
        
        // Find all matches
        const matches = [...text.matchAll(regex)];
        
        if (matches.length > 0) {
          // We found a match! We need to split this text node into multiple nodes
          const newChildren = [];
          let lastIndex = 0;

          for (const match of matches) {
            const matchStart = match.index;
            const matchEnd = matchStart + match[0].length;
            const matchedText = match[0];
            const targetUrl = dictMap.get(matchedText.toLowerCase());

            // 1. Text before the match
            if (matchStart > lastIndex) {
              newChildren.push({
                ...child,
                text: text.slice(lastIndex, matchStart)
              });
            }

            // 2. The Link Node
            newChildren.push({
              type: 'link',
              fields: {
                url: targetUrl,
                linkType: 'custom',
                newTab: false
              },
              children: [
                {
                  ...child,
                  text: matchedText
                }
              ],
              direction: child.direction,
              format: '',
              indent: 0,
              version: 1
            });

            lastIndex = matchEnd;
          }

          // 3. Text after the last match
          if (lastIndex < text.length) {
            newChildren.push({
              ...child,
              text: text.slice(lastIndex)
            });
          }

          // Replace the current text node with the new children
          node.children.splice(i, 1, ...newChildren);
          
          // Skip the newly inserted nodes in the loop
          i += newChildren.length - 1;
        }
      } else if (child.children) {
        // Recurse into non-text children (like paragraphs, lists)
        traverseAndReplace(child);
      }
    }
  }

  traverseAndReplace(data.root);

  return data;
}
