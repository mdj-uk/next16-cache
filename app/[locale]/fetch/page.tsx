import {fakeAwait} from '@/utils/fakeAwait';
import {cacheLife, cacheTag} from 'next/cache';
import Image from "next/image";

const fetchData = async () => {
	'use cache'
	cacheLife({ stale: 10, revalidate: 20 })
	cacheTag('data')

	await fakeAwait(1000);

	return 'data';
}

const Home = async ({ params }: { params: { locale: string } }) => {
  params = await params;

	const data = await fetchData();

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            locale: {params.locale}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {data}
          </p>
        </div>
      </main>
    </div>
	)
}

export default Home;