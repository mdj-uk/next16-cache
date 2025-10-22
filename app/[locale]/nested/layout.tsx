

import {Suspense} from 'react';
import {fakeAwait} from '@/utils/fakeAwait';

const CachedLayout = async ({children}: {children: React.ReactNode}) => {
	'use cache'
	await fakeAwait(1000);

	return (
		 <Suspense fallback={<div>Loading page...</div>}>{children}</Suspense>
	);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return <CachedLayout>{children}</CachedLayout>
}
