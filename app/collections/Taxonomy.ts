import { CollectionConfig } from 'payload';

export const Taxonomy: CollectionConfig = {
  slug: 'taxonomy',
  admin: {
    useAsTitle: 'keyword',
    defaultColumns: ['keyword', 'url'],
    group: 'Programmatic SEO',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'keyword',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'The exact phrase or word to link (e.g., "Chi Energy" or "Master Pramod").',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'The absolute or relative URL this keyword should link to (e.g., "/about" or "/discover/martial-arts/for-beginners").',
      },
    },
  ],
};
