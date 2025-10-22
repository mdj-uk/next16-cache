'use cache: remote'

import {fakeAwait} from '@/utils/fakeAwait';
import Image from "next/image";

const Home = async ({ params }: { params: { locale: string } }) => {
  params = await params;
	await fakeAwait(1000);

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
        </div>
      </main>
    </div>
	)
}

export default Home;