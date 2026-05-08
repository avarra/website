"use client";

import { useState } from 'react'
import Head from 'next/head'
import Header from '@/components/header'
import Image from 'next/image'
import Link from 'next/link'
import { capitalizeFirstLetter } from '@/lib/utils';

const members = {
  aiken: '/aiken.png',
  matej: '/matej.png',
  tim: '/tim.png',
}

export default function Work() {
  const [activeMember, setActiveMember] = useState<keyof typeof members | null>(null)
  const activeImage = activeMember ? members[activeMember] : null

  return (
    <>
      <Head>
        <title>Work | Avarra</title>
        <meta
          name="description"
          content="Selected work and collaborations from the Avarra team."
        />
      </Head>

      <div className="min-h-screen bg-white text-black">
        <Header theme="light" active="work" />

        <main className="overflow-hidden">
          <section className="relative mx-auto max-w-6xl px-5 pt-28 text-center sm:px-10 md:pt-36 lg:px-16">
            <p className="mx-auto max-w-5xl text-[clamp(2.15rem,5.2vw,4.4rem)] font-extrabold leading-[1.16] tracking-normal">
              Our team members (
              {Object.entries(members).map(([key, _], index, people) => {
                const member = key as keyof typeof members;

                return (
                <span key={member}>
                  <button
                    type="button"
                    className="align-baseline underline underline-offset-[0.14em] transition hover:text-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    onMouseEnter={() => setActiveMember(member)}
                    onMouseLeave={() => setActiveMember(null)}
                    onFocus={() => setActiveMember(member)}
                    onBlur={() => setActiveMember(null)}
                  >
                    {capitalizeFirstLetter(member)}
                  </button>
                  {index < people.length - 2 ? ', ' : index === people.length - 2 ? ', and ' : ''}
                </span>
              )
              })}
              ), have collectively and individually collaborated with a wide range of clients and partners, including but not limited to
            </p>

            <div
              className={`pointer-events-none absolute left-1/2 top-10 hidden w-52 -translate-x-1/2 transition duration-200 md:block ${
                activeImage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              aria-hidden="true"
            >
              {activeImage && (
                <Image
                  src={activeImage}
                  alt=""
                  width={208}
                  height={260}
                  className="aspect-4/5 w-full object-cover shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
                />
              )}
            </div>
          </section>

          <section className="mx-auto grid max-w-7xl gap-16 px-5 pt-24 sm:px-10 md:pt-28 lg:px-16">
            <Link
              href="/fundl"
              className="block w-full max-w-125 transition hover:opacity-80"
              aria-label="Open Fundl case study"
            >
              <Image
                src="/work1.png"
                alt="Selected Fundl campaign work"
                width={500}
                height={500}
                className="aspect-square w-full object-cover"
              />
            </Link>

            <Image
              src="/work2.png"
              alt="Selected go-to-market toolkit work"
              width={900}
              height={500}
              className="ml-auto aspect-[1.8/1] w-full max-w-225 object-cover"
            />
          </section>

          <section id="proposal" className="px-5 py-32 text-center sm:px-10 md:py-44 lg:px-16">
            <Link
              href="mailto:hello@avarra.dev"
              className="text-[clamp(3rem,8vw,6.25rem)] font-extrabold leading-none tracking-normal transition hover:text-black/55"
            >
              hello@avarra.dev
            </Link>
          </section>
        </main>
      </div>
    </>
  )
}
