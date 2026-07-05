import { CollectionConfig } from 'payload';

export const PseoNiches: CollectionConfig = {
  slug: 'pseo-niches',
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
        description: 'The core topic (e.g., "Martial Arts", "Holistic Health")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL friendly slug (e.g., "martial-arts")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A 2-3 sentence overview of this niche.',
      },
    },
    {
      name: 'relatedCourses',
      type: 'relationship',
      relationTo: 'coursenames',
      hasMany: true,
      admin: {
        description: 'Select the specific courses that apply to this niche.',
      },
    },
  ],
};
