import Image from "next/image";
import Link from "next/link";
import { CalBookingLink } from "@/components/cal-booking-link";

type HeaderLabels = {
  home: string;
  services: string;
  work: string;
  booking: string;
};

type Props = {
  theme?: "dark" | "light";
  active?: "services" | "work";
  overlay?: boolean;
  labels: HeaderLabels;
};

export default function Header({
  theme = "dark",
  active,
  overlay = false,
  labels,
}: Props) {
  const isLight = theme === "light";
  const textClass = isLight ? "text-ink" : "text-white";
  const logoSrc = isLight ? "/logo_black.svg" : "/logo.svg";
  const positionClass = overlay ? "absolute left-0 top-0" : "relative";

  return (
    <header
      className={`${positionClass} z-30 w-full ${textClass}`}
      data-cursor-tone={isLight ? undefined : "light"}
    >
      <div className="mx-auto flex min-h-40 w-full max-w-[1408px] items-center justify-between px-5 sm:px-8 lg:px-16 max-[900px]:min-h-28 max-[680px]:min-h-24">
        <Link
          href="/"
          className="inline-flex transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none"
          aria-label={labels.home}
          data-cursor-label="Home"
        >
          <Image
            src={logoSrc}
            alt="Avarra"
            width={118}
            height={30}
            className="h-auto w-36 max-[680px]:w-24"
            loading="eager"
          />
        </Link>

        <nav className="ml-auto mr-8 hidden items-center gap-7 text-xs font-semibold uppercase tracking-tight md:flex lg:gap-10">
          <Link
            className={`relative py-2 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-brand after:transition-transform hover:text-brand ${
              active === "services"
                ? "text-brand after:scale-x-100"
                : "after:scale-x-0 hover:after:scale-x-100"
            }`}
            href="/services"
          >
            {labels.services}
          </Link>
          <Link
            className={`relative py-2 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-brand after:transition-transform hover:text-brand ${
              active === "work"
                ? "text-brand after:scale-x-100"
                : "after:scale-x-0 hover:after:scale-x-100"
            }`}
            href="/work"
          >
            {labels.work}
          </Link>
        </nav>

        <CalBookingLink
          className="orange-button"
          cursorLabel="Book"
        >
          {labels.booking}
        </CalBookingLink>
      </div>
    </header>
  );
}
