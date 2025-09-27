import HeroSection from '../components/HeroSection'
import SkillsSection from '../components/SkillsSection'
import FeaturedWork from '../components/FeaturedWork'
import CertificatesSection from '../components/CertificatesSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SkillsSection />
      <FeaturedWork />
      <CertificatesSection />
    </div>
  )
}