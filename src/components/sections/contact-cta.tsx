type Contact = {
  label: string;
  heading: string;
  body: string;
  email: string;
};

type Props = {
  contact: Contact;
};

export function ContactCta({ contact }: Props) {
  return (
    <section
      id="proposal"
      className="relative mt-28 overflow-hidden bg-brand px-5 py-20 text-white sm:px-8 md:mt-40 md:py-28 lg:px-16"
      data-cursor-tone="light"
    >
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,transparent_0_calc(16.6667%_-_.5px),white_calc(16.6667%_-_.5px)_calc(16.6667%_+_.5px),transparent_calc(16.6667%_+_.5px)_100%)]" />
      <div className="relative mx-auto grid max-w-[1280px] gap-12 md:grid-cols-[0.82fr_1.18fr] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
            {contact.label}
          </p>
          <h2 className="mt-5 max-w-xl text-[clamp(2.7rem,5.6vw,6.2rem)] font-bold leading-[0.88] tracking-tighter uppercase">
            {contact.heading}
          </h2>
        </div>
        <div className="md:text-right">
          <p className="ml-auto max-w-xl text-base font-light leading-tight text-white/82 md:text-xl">
            {contact.body}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-8 inline-block break-all border-b border-white/45 pb-1 text-[clamp(2rem,4.5vw,4.8rem)] font-bold leading-none tracking-tighter transition hover:border-white"
            data-cursor-label="Email"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
