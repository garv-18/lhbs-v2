import { injectLinks } from './app/(frontend)/utils/injectLinks.js';

const ast = {
  "root": {
    "children": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "If you are interested in Holistic Health, you should also look into our program on Chi Energy, which pairs perfectly with the 18 Hands of Lohan course",
            "format": 3
          }
        ]
      }
    ]
  }
};

const dictionary = [
  { keyword: 'Holistic Health', url: '/discover/holistic-health' },
  { keyword: 'Chi Energy', url: '/discover/chi-energy' },
  { keyword: '18 Hands of Lohan', url: '/courses/18-hands' }
];

const result = injectLinks(ast, dictionary);
console.log(JSON.stringify(result, null, 2));
