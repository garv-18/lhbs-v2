import { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'targetPage', 'rank'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/courses', 'layout');
        return doc;
      }
    ],
    afterDelete: [
      async ({ doc, req }) => {
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/courses', 'layout');
        return doc;
      }
    ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'e.g. master-program, kids-program',
      }
    },
    {
      name: 'targetPage',
      type: 'select',
      required: true,
      options: [
        { label: 'Courses Page (/courses)', value: '/courses' },
        { label: 'Products Page (/products)', value: '/products' },
      ],
      defaultValue: '/courses',
    },
    {
      name: 'rank',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        description: 'Lower number means it appears higher up on the page (e.g. 1 appears before 2).',
      }
    },
  ],
};
