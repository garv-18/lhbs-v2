import { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return Boolean(user);
    },
    update: ({ req: { user } }) => {
      return Boolean(user);
    },
    delete: ({ req: { user } }) => {
      return Boolean(user);
    },
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/posts');
        revalidatePath(`/posts/${doc.slug}`);
        return doc;
      }
    ],
    afterDelete: [
      async ({ doc }) => {
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/posts');
        revalidatePath(`/posts/${doc.slug}`);
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
        description: 'The URL path for this post (e.g., my-first-post). Do not include the leading slash.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: false,
    },
    {
      name: 'coverImageUrl',
      type: 'text',
      required: false,
      admin: {
        description: 'External URL for the cover image (overrides uploaded coverImage if set)',
      }
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: false,
    },
    {
      name: 'contentHtml',
      type: 'textarea', // We store raw HTML from Novel.sh here
      required: false,
    },
    {
      name: 'contentJson',
      type: 'json', // We store raw JSON from Novel.sh here in case we want to re-edit
      required: false,
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
