import Head from 'next/head';
import Header from '@/components/header';
import Image from 'next/image';

const services = [
  {
    title: 'Internal systems',
    image: '/services1.png',
    imageAlt: 'A team celebrating around a planning table',
    imageWidth: 430,
    imageHeight: 524,
    text: 'Internal systems are the backbone of every efficient business. We design and develop custom platforms that streamline operations, automate repetitive tasks, and connect your workflows into one smooth ecosystem. From employee dashboards and CRM tools to inventory management and reporting systems, our solutions help teams work smarter, faster, and with less friction. Built around your processes, made to scale with your growth.',
    className:
      'md:col-span-2 md:grid md:grid-cols-[0.95fr_1.6fr] md:items-start md:gap-8',
    imageClassName: 'aspect-[4/3] md:aspect-[0.82/1]',
    textClassName: 'md:max-w-xl',
  },
  {
    title: 'Hardware solutions',
    image: '/services2.png',
    imageAlt: 'An engineer working on a circuit board',
    imageWidth: 430,
    imageHeight: 538,
    text: 'Hardware solutions built for real-world performance and reliability. We design and develop custom devices, embedded systems, and smart technology tailored to your needs. From prototypes to production-ready products, every solution is engineered for efficiency, durability, and seamless integration with your software ecosystem.',
    className: 'md:col-start-1 md:mt-32',
    imageClassName: 'aspect-[1/1.25]',
    textClassName: 'mt-4',
  },
  {
    title: 'Mobile and web products',
    image: '/services3.png',
    imageAlt: 'A person using a mobile app',
    imageWidth: 430,
    imageHeight: 524,
    text: 'Mobile and web applications built to elevate your business and engage your users. We create fast, modern, and scalable apps with seamless performance across devices. From customer platforms to internal tools, every solution is designed for great user experience, clean functionality, and long-term growth.',
    className: 'md:col-start-2 md:mt-4 md:justify-self-end',
    imageClassName: 'aspect-[0.82/1]',
    textClassName: 'mt-4 text-right md:max-w-md',
  },
];

export default function Services() {
  return (
    <>
      <Head>
        <title>Services | Avarra</title>
        <meta
          name="description"
          content="Avarra builds product-led systems, web platforms, apps, and hardware solutions that scale."
        />
      </Head>

      <div className="min-h-screen bg-white text-black">
        <Header theme="light" active="services" />

        <main id="services" className="overflow-hidden">
          <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-10 lg:px-16">
            <div className="relative min-h-130 md:min-h-152.5">
              <h1 className="sticky top-24 z-20 mx-auto max-w-5xl text-center text-[clamp(2.15rem,5vw,4.75rem)] font-extrabold leading-[1.08] tracking-normal md:top-28">
                We build tools and apps people actually use and love.
              </h1>

              <div className="relative mx-auto -mt-4.5 max-w-5xl md:-mt-6">
                <Image
                  src="/hero_services.png"
                  alt="A person holding a bowl of popcorn while relaxing in a blue chair"
                  width={360}
                  height={474}
                  className="mx-auto block aspect-[0.76/1] w-full max-w-72.5 object-cover md:max-w-90"
                />
                <p className="mx-auto mt-6 max-w-xs text-center text-base font-medium leading-tight md:absolute md:bottom-10 md:right-0 md:mt-0 md:text-left md:text-lg">
                  Product-led systems, elegant mobile apps and web platforms
                  that scale. We help teams ship faster, reduce operational
                  cost, and turn work into outcomes.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-10 md:py-20 lg:px-16">
            <p className="mx-auto max-w-5xl text-[clamp(1.85rem,4vw,3.25rem)] font-extrabold leading-[1.12] tracking-normal">
              Avarra is literally the best agency I&apos;ve worked with for
              software and hardware development. They took my idea and turned it
              into a clean, high-performing product that actually exceeded
              expectations. The whole team was super easy to work with, always
              on point, and crazy good at solving problems fast. Communication
              was smooth, deadlines were hit, and the final result was straight
              fire. Highly recommend.
            </p>
          </section>

          <section className="mx-auto max-w-4xl px-5 py-8 sm:px-10 md:py-12">
            <Image
              src="/diagram.png"
              alt="Avarra service diagram covering hardware solutions, internal systems, and web and mobile products"
              width={620}
              height={620}
              className="mx-auto w-full max-w-155"
            />
          </section>

          <section className="mx-auto grid max-w-6xl gap-16 px-5 py-14 sm:px-10 md:grid-cols-2 md:gap-x-24 md:gap-y-10 lg:px-16">
            {services.map((service) => (
              <article key={service.title} className={service.className}>
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={service.imageWidth}
                  height={service.imageHeight}
                  className={`w-full max-w-107.5 object-cover ${service.imageClassName}`}
                />
                <div className={service.textClassName}>
                  <h2 className="sr-only">{service.title}</h2>
                  <p className="text-base font-medium leading-tight md:text-lg">
                    {service.text}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <section
            id="proposal"
            className="px-5 py-24 text-center sm:px-10 md:py-32 lg:px-16"
          >
            <a
              href="mailto:hello@avarra.dev"
              className="text-[clamp(3rem,8vw,6.25rem)] font-extrabold leading-none tracking-normal transition hover:text-black/55"
            >
              hello@avarra.dev
            </a>
          </section>
        </main>
      </div>
    </>
  );
}
