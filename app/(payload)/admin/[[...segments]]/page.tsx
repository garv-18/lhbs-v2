import type { Metadata } from 'next'
import configPromise from '../../../../payload.config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config: configPromise, params, searchParams })

const PageComponent = ({ params, searchParams }: Args) =>
  RootPage({ config: configPromise, importMap: undefined as any, params, searchParams })

export default PageComponent
