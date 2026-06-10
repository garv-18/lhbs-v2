import configPromise from '../../payload.config';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import React from 'react';

type Args = {
  children: React.ReactNode;
};

const serverFunction = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap: undefined as any,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={configPromise} importMap={undefined as any} serverFunction={serverFunction}>{children}</RootLayout>
);

export default Layout;
