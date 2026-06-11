import configPromise from '../../payload.config';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import React from 'react';
import '@payloadcms/next/css';

import { importMap } from './admin/importMap.js';

type Args = {
  children: React.ReactNode;
};

const serverFunction = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <html lang="en">
    <body>
      <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
        {children}
      </RootLayout>
    </body>
  </html>
);

export default Layout;
