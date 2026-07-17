import Navigation from "./Navigation";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-50 bg-[rgba(244,242,236,0.88)] backdrop-blur border-b border-[rgba(202,198,187,0.7)]">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-display text-xl font-semibold">
          SANWAL BAJWA
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
