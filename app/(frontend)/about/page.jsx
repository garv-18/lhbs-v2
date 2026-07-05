import React from 'react'
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { injectLinks, getLinkingDictionary } from '../utils/injectLinks'

export const revalidate = 60;

export const metadata = {
  title: "About Us | LHBS",
  description: "Learn more about LHBS Martial Arts Academy.",
};

const AboutPage = async () => {
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
  });

  const page = data.docs[0];
  const dictionary = await getLinkingDictionary(payload);

  return (
    <div className="max-w-[1400px] mx-auto p-5 text-text min-h-screen pt-32 pb-20 prose prose-lg prose-gray max-w-none">
      <h1 className="m-auto p-5 text-center text-4xl font-bold mb-8">{page?.title || 'About Us'}</h1>
      
      {page?.content ? (() => {
        const linkedContent = injectLinks(page.content, dictionary);
        return <RichText data={linkedContent} />;
      })() : (
        <div className="text-center text-gray-500 py-20">
          <p>This is the new dedicated About Us page.</p>
          <p className="mt-4">Please log in to the Payload CMS at `/admin`, go to the "Pages" collection, and create a new page with the title "About Us" and the slug "about" to fill in this content!</p>
        </div>
      )}
    </div>
  )
}

export default AboutPage
