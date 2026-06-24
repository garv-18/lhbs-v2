import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import { Media } from './app/collections/Media';
import { Categories } from './app/collections/Categories';
import { Pages } from './app/collections/Pages';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Media,
    Categories,
    Pages,
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        // Email added by default
      ],
    },
    {
      slug: 'coursenames',
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
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'slogan',
          type: 'text',
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: false,
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Legacy plaintext description. Will be replaced by Rich Text.'
          }
        },
        {
          name: 'descriptionRichText',
          type: 'richText',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            }
          ]
        },
        {
          name: 'price',
          type: 'number',
        },
        {
          name: 'originalPrice',
          type: 'number',
          admin: {
            description: 'If provided and greater than the standard price, a discount percentage badge will automatically appear on the website.'
          }
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
        },
        {
          name: 'gallery',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media' as any,
            }
          ]
        },
      ],
    },
    {
      slug: 'orders',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        { name: 'name', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'course', type: 'text' },
        { name: 'amount', type: 'number' },
        { name: 'transactionId', type: 'text' },
        { 
          name: 'status', 
          type: 'select', 
          defaultValue: 'PENDING',
          options: ['PENDING', 'SUCCESS', 'FAILED']
        },
      ],
    },
    {
      slug: 'payments',
      admin: {
        useAsTitle: 'userEmail',
      },
      fields: [
        { name: 'userEmail', type: 'text' },
        { name: 'courseSlug', type: 'text' },
        { name: 'razorpay_order_id', type: 'text' },
        { name: 'razorpay_payment_id', type: 'text' },
        { name: 'razorpay_signature', type: 'text' },
        { name: 'paid', type: 'checkbox' },
      ],
    }
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'secret-key',
  defaultDepth: 1,
  maxDepth: 2,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: true,
  }),
});
