import { CollectionConfig } from 'payload';
import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
} as any);

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    disableLocalStorage: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'imagekitFileId',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        if (operation === 'create' && args.req.file) {
          const file = args.req.file;
          
          try {
            const uploadResponse = await imagekit.files.upload({
              file: file.data.toString('base64'), // ImageKit accepts base64
              fileName: file.name,
              folder: '/payload-media', // Optional: customize folder
            });

            // Modify req.file so Payload uses the ImageKit URL
            // Payload's upload feature sets `url` internally, but we can override it in beforeChange
            
            // To pass data to beforeChange, we can mutate args.data or attach it to the req
            args.req.context.payloadUploadResponse = uploadResponse;
          } catch (error) {
            console.error('ImageKit Upload Error:', error);
            throw new Error('Failed to upload image to ImageKit');
          }
        }
        return args;
      },
    ],
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.context?.payloadUploadResponse) {
          const uploadRes = req.context.payloadUploadResponse as any;
          
          return {
            ...data,
            url: uploadRes.url,
            imagekitFileId: uploadRes.fileId,
          };
        }
        return data;
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        if (doc.imagekitFileId) {
          try {
            await imagekit.files.delete(doc.imagekitFileId);
          } catch (error) {
            console.error('Failed to delete image from ImageKit:', error);
          }
        }
      },
    ],
  },
};
