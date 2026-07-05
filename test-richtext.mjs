import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RichText } from '@payloadcms/richtext-lexical/react';

const ast = {
  "root": {
    "children": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "Before link "
          },
          {
            "type": "link",
            "fields": {
              "url": "/test",
              "linkType": "custom",
              "newTab": false
            },
            "children": [
              {
                "type": "text",
                "text": "The Link"
              }
            ],
            "version": 1
          },
          {
            "type": "text",
            "text": " after link."
          }
        ]
      }
    ]
  }
};

const html = renderToStaticMarkup(React.createElement(RichText, { data: ast }));
console.log(html);
