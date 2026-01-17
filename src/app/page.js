import HeroSection from '../components/HeroSection'
import SkillsSection from '../components/SkillsSection'
import FeaturedWork from '../components/FeaturedWork'
import CertificatesSection from '../components/CertificatesSection'
import FeaturedBlogSection from '../components/FeaturedBlogSection'
import ContactSection from '../components/ContactSection'

export const metadata = {
  alternates: {
    canonical: 'https://sanwalbajwa.com',
  },
  openGraph: {
    title: 'Sanwal Bajwa | Full Stack Developer & WordPress Expert',
    description: 'Full Stack Developer with 2+ years of experience in WordPress, Next.js, React, and modern web technologies.',
    url: 'https://sanwalbajwa.com',
    siteName: 'Sanwal Bajwa',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sanwal Bajwa - Full Stack Developer',
      },
    ],
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SkillsSection />
      <FeaturedWork />
      <CertificatesSection />
      <FeaturedBlogSection />
      <ContactSection />
    </div>
  )
}