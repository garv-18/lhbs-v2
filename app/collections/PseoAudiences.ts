import { CollectionConfig } from 'payload';

export const PseoAudiences: CollectionConfig = {
  slug: 'pseo-audiences',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    group: 'Programmatic SEO',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'The target audience (e.g., "for Business Leaders", "for Beginners")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL friendly slug (e.g., "for-business-leaders")',
      },
    },
    {
      name: 'painPoints',
      type: 'textarea',
      required: true,
      admin: {
        description: 'What does this audience struggle with? (e.g., "High stress, lack of focus, sedentary lifestyle.")',
      },
    },
    {
      name: 'benefits',
      type: 'textarea',
      required: true,
      admin: {
        description: 'How does our training help them? (e.g., "Builds unshakeable mental discipline and releases physical tension.")',
      },
    },
  ],
};
