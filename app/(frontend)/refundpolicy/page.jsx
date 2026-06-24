import React from 'react'
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const revalidate = 60; // ISR cache revalidation

const Refundpolicy = async () => {
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'refundpolicy' } },
  });

  const page = data.docs[0];

  return (
    <div className="max-w-[1400px] mx-auto p-5 text-text min-h-screen pt-32 pb-20 prose prose-lg prose-gray max-w-none">
      <h1 className="m-auto p-5 text-center text-4xl font-bold mb-8">{page?.title || 'Refund Policy'}</h1>
      
      {page?.content ? (
        <RichText data={page.content} />
      ) : (
        <div className="text-center text-gray-500 py-20">
          <p>No content available yet. Please add a "refundpolicy" page in the CMS.</p>
        </div>
      )}
    </div>
  )
}

export default Refundpolicy