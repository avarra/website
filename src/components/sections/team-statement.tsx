"use client";

import Image from "next/image";
import { useState } from "react";

type TeamMember = {
  name: string;
  image: string;
};

type Props = {
  members: readonly TeamMember[];
  prefix: string;
  suffix: string;
};

export function TeamStatement({ members, prefix, suffix }: Props) {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-28 text-center sm:px-10 md:pt-36 lg:px-16">
      <p className="mx-auto max-w-5xl text-[clamp(2.1rem,5.2vw,4.4rem)] font-black leading-[1.05] tracking-normal">
        {prefix} (
        {members.map((member, index) => (
          <span key={member.name}>
            <button
              type="button"
              className="align-baseline underline underline-offset-[0.14em] transition hover:text-[var(--pulse)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]"
              onMouseEnter={() => setActiveMember(member)}
              onMouseLeave={() => setActiveMember(null)}
              onFocus={() => setActiveMember(member)}
              onBlur={() => setActiveMember(null)}
            >
              {member.name}
            </button>
            {index < members.length - 2
              ? ", "
              : index === members.length - 2
                ? ", and "
                : ""}
          </span>
        ))}
        ), {suffix}
      </p>

      <div
        className={`pointer-events-none absolute left-1/2 top-10 hidden w-52 -translate-x-1/2 transition duration-200 md:block ${
          activeMember ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        aria-hidden="true"
      >
        {activeMember && (
          <Image
            src={activeMember.image}
            alt=""
            width={208}
            height={260}
            className="aspect-4/5 w-full object-cover shadow-[0_18px_45px_rgba(23,21,20,0.2)]"
          />
        )}
      </div>
    </section>
  );
}
