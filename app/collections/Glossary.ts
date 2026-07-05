import { CollectionConfig } from 'payload';
import {
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Glossary: CollectionConfig = {
  slug: 'glossary',
  admin: {
    useAsTitle: 'term',
    defaultColumns: ['term', 'updatedAt'],
    group: 'Programmatic SEO',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'term',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'The martial arts or fitness term (e.g., "Horse Stance").',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated URL slug (e.g., "horse-stance").',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (data && data.term && !value) {
              return data.term
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            }
            return value;
          }
        ]
      }
    },
    {
      name: 'definition',
      type: 'richText',
      required: true,
      editor: lexicalEditor({}),
      admin: {
        description: 'The detailed definition and explanation of the term.',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'SEO Title (Keep under 60 characters)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'SEO Meta Description (Keep under 160 characters)',
      },
    },
  ],
};
