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
    <section id="proposal" className="px-5 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-(--line) pt-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-(--muted)">
            {contact.label}
          </p>
          <h2 className="mt-4 max-w-xl text-[clamp(2.25rem,5vw,5.7rem)] font-black leading-[0.95] tracking-normal">
            {contact.heading}
          </h2>
        </div>
        <div className="md:text-right">
          <p className="ml-auto max-w-xl text-lg font-medium leading-tight text-(--muted) md:text-xl">
            {contact.body}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-7 inline-block break-all text-[clamp(2.4rem,5vw,5rem)] font-black leading-none tracking-normal transition hover:text-(--pulse)"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
