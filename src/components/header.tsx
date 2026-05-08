import Image from "next/image"
import Link from "next/link"

type Props = {
  theme?: 'dark' | 'light';
  active?: string;
  overlay?: boolean
}

export default function Header({ theme = 'dark', active, overlay = false } : Props) {
  const isLight = theme === 'light'
  const textClass = isLight ? 'text-black' : 'text-white'
  const hoverClass = isLight ? 'hover:text-black/60' : 'hover:text-white/75'
  const proposalClass = isLight
    ? 'border-black/55 hover:border-black hover:bg-black hover:text-white'
    : 'border-white/75 hover:border-white hover:bg-white hover:text-black'
  const logoSrc = isLight ? '/logo_black.svg' : '/logo.svg'
  const positionClass = overlay ? 'absolute left-0 top-0' : 'relative'

  return (
    <header className={`${positionClass} z-30 w-full px-5 py-7 ${textClass} sm:px-10 lg:px-16`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="block transition-opacity hover:opacity-75" aria-label="Avarra home">
          <Image
            src={logoSrc}
            alt="Avarra"
            width={78}
            height={20}
            className="h-5 w-auto sm:h-6"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-extrabold md:flex lg:gap-8">
          <a
            className={`transition ${hoverClass} ${active === 'services' ? 'underline underline-offset-4' : ''}`}
            href="/services"
          >
            Services
          </a>
          <a
            className={`transition ${hoverClass} ${active === 'work' ? 'underline underline-offset-4' : ''}`}
            href="/work"
          >
            Work
          </a>
        </nav>

        <a
          className={`border border-dashed px-3 py-2 text-[14px] font-extrabold transition sm:px-4 sm:text-[15px] ${proposalClass}`}
          href="#proposal"
        >
          Request proposal
        </a>
      </div>
    </header>
  )
}
