import { GlobalConfig } from 'payload';

export const HomepageMedia: GlobalConfig = {
  slug: 'homepage-media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Background Video',
    },
    {
      name: 'expertProgramImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Expert Program Image',
    },
    {
      name: 'masterProgramImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Master Program Image',
    },
    {
      name: 'businessProgramImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Business Program Image',
    },
    {
      name: 'aboutMasterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'About Master Pramod Image',
    },
    {
      name: 'trainingCulturesImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Training Cultures Image',
    },
    {
      name: 'trainingAnimalsImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Training Animals Image',
    },
    {
      name: 'trainingWeaponsImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Training Weapons Image',
    },
  ],
};
