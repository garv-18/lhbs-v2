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
    {
      name: 'imagekitUrl',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        if ((operation === 'create' || operation === 'update') && args.req.file) {
          const file = args.req.file;
          
          try {
            const uploadResponse = await imagekit.files.upload({
              file: file.data.toString('base64'),
              fileName: file.name,
              folder: '/payload-media',
            });

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
        if ((operation === 'create' || operation === 'update') && req.context?.payloadUploadResponse) {
          const uploadRes = req.context.payloadUploadResponse as any;
          
          return {
            ...data,
            imagekitUrl: uploadRes.url,
            imagekitFileId: uploadRes.fileId,
          };
        }
        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc.imagekitUrl) {
          return {
            ...doc,
            url: doc.imagekitUrl,
          };
        }
        if (doc.imagekitFileId && process.env.IMAGEKIT_URL_ENDPOINT) {
          const endpoint = process.env.IMAGEKIT_URL_ENDPOINT.replace(/\/$/, '');
          return {
            ...doc,
            url: `${endpoint}/payload-media/${doc.filename}`
          };
        }
        
        // If the URL is already an absolute HTTP URL, leave it alone!
        if (doc.url && doc.url.startsWith('http')) {
          return doc;
        }

        // Hardcoded recovery for lost media files due to migration
        const titleStr = doc.alt?.toLowerCase() || '';
        const filenameStr = doc.filename?.toLowerCase() || '';
        
        const recoveries = {
            'muay-thai': 'https://ik.imagekit.io/lhbs/muay-thai.png?updatedAt=1751458719255',
            'kung-fu': 'https://ik.imagekit.io/lhbs/kung-fu.png?updatedAt=1751458720326',
            'krav-maga': 'https://ik.imagekit.io/lhbs/krav-maga.png?updatedAt=1751458718291',
            'capoeira': 'https://ik.imagekit.io/lhbs/capoeira.png?updatedAt=1751458719046',
            'tai-chi': 'https://ik.imagekit.io/lhbs/tai-chi.png?updatedAt=1751458718173',
            'muscle': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
            'diet': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop',
            'street': 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop',
            'roadfight': 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop',
            'tiger': 'https://ik.imagekit.io/lhbs/tiger-style.png?updatedAt=1751458718375',
            'eagle': 'https://ik.imagekit.io/lhbs/eagle-style.png?updatedAt=1751458716362',
            'snake': 'https://ik.imagekit.io/lhbs/snake-style%20.png?updatedAt=1751458718560',
            'height': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
            'weight': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
            'vision': 'https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?q=80&w=2009&auto=format&fit=crop',
            'eye': 'https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?q=80&w=2009&auto=format&fit=crop',
            'spirit': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop'
        };

        for (const [key, recoveryUrl] of Object.entries(recoveries)) {
            if (titleStr.includes(key) || filenameStr.includes(key)) {
                return { ...doc, url: recoveryUrl };
            }
        }

        // Final fallback: if ImageKit endpoint is available and it's a local URL, assume it's there
        if (process.env.IMAGEKIT_URL_ENDPOINT) {
           const endpoint = process.env.IMAGEKIT_URL_ENDPOINT.replace(/\/$/, '');
           return {
             ...doc,
             url: `${endpoint}/${doc.filename}`
           };
        }

        return doc;
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        if (operation === 'update' && previousDoc?.imagekitFileId && doc.imagekitFileId !== previousDoc.imagekitFileId) {
          try {
            await imagekit.files.delete(previousDoc.imagekitFileId);
          } catch (error) {
            console.error('Failed to delete old image from ImageKit:', error);
          }
        }
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
