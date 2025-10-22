'use cache'

import {Suspense} from 'react';
import {fakeAwait} from '@/utils/fakeAwait';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	await fakeAwait(1000);
  return (
     <Suspense fallback={<div>Loading 2...</div>}>{children}</Suspense>
  );
}
