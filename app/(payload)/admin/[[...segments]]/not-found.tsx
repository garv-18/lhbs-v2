import configPromise from '../../../../payload.config'
import { NotFoundPage } from '@payloadcms/next/views'
import React from 'react'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args) => ({
  title: 'Not Found',
})

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config: configPromise, params, searchParams, importMap: undefined as any })

export default NotFound
