import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/header';

export default function Home() {
  const tickerItems = Array.from({ length: 10 }, (_, index) => index);

  return (
    <>
      <Head>
        <title>Avarra</title>
        <meta
          name="description"
          content="Avarra builds focused growth systems for ambitious brands."
        />
      </Head>

      <div className="min-h-screen overflow-hidden bg-black text-white">
        <Header theme="dark" overlay />

        <main>
          <section className="relative min-h-screen overflow-hidden">
            <Image
              src="/hero.png"
              alt=""
              width={823}
              height={649}
              className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-[33%_28%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_100%)]" />
            <div className="absolute inset-y-0 left-0 w-28 bg-linear-to-r from-black/55 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-28 bg-linear-to-l from-black/55 to-transparent" />

            <div className="relative z-10 flex min-h-screen items-end px-5 pb-28 sm:px-10 lg:px-16">
              <div className="sr-only">
                <h1>Choose growth over comfort.</h1>
                <p>
                  Avarra helps brands choose growth through focused strategy and
                  execution.
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 z-20 w-full border-t border-black/10 bg-white py-5 text-black shadow-[0_-20px_60px_rgba(0,0,0,0.28)]">
              <div className="ticker-track flex w-max items-center gap-9 whitespace-nowrap text-lg font-extrabold uppercase tracking-normal sm:text-xl">
                {[...tickerItems, ...tickerItems].map((_, index) => (
                  <span key={index}>Only 2 spots left</span>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
