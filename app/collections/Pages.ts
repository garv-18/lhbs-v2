import { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/blog', 'page');
        revalidatePath(`/blog/${doc.slug}`, 'page');
        return doc;
      }
    ],
    afterDelete: [
      async ({ doc }) => {
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/blog', 'page');
        revalidatePath(`/blog/${doc.slug}`, 'page');
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
        description: 'The URL path for this page (e.g., about, contact, refundpolicy, termsandconditions). Do not include the leading slash.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
};
