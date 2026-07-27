import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#17313b] text-[#d7d2c7]">
      <div className="flex flex-col gap-5 px-5 py-8 font-mono text-xs uppercase tracking-[0.16em] sm:px-8 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
        <p>Copyright {currentYear} Sanwal Bajwa</p>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <p>Software Developer</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
