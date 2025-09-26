import HeroSection from '../components/HeroSection'
import SkillsSection from '../components/SkillsSection'
import FeaturedWork from '../components/FeaturedWork'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SkillsSection />
      <FeaturedWork />
    </div>
  )
}