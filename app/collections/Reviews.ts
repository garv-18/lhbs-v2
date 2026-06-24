import { CollectionConfig } from 'payload';

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'reviewerName',
    defaultColumns: ['reviewerName', 'rating', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'reviewerName',
      type: 'text',
      required: true,
    },
    {
      name: 'reviewText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'profilePhotoUrl',
      type: 'text',
      admin: {
        description: 'Optional: Paste the image URL of the reviewer\'s profile photo.',
      },
    },
    {
      name: 'datePosted',
      type: 'text',
      admin: {
        description: 'Optional: e.g. "2 weeks ago" or "a month ago"',
      },
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      admin: {
        description: 'Optional: Link directly to this specific review on Google Maps.',
      },
    },
  ],
};
