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