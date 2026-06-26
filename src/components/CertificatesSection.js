"use client"
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Award, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { supabase } from '../lib/supabase'

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6) // Show only 6 certificates on home page

      if (!error && data) {
        setCertificates(data)
      }
    } catch (error) {
      console.error('Error fetching certificates:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToCertificate = (index) => {
    const slider = sliderRef.current
    if (!slider) return

    const slide = slider.children[index]
    if (!slide) return

    slider.scrollTo({
      left: slide.offsetLeft,
      behavior: 'smooth'
    })
    setActiveIndex(index)
  }

  const handlePrevious = () => {
    scrollToCertificate(Math.max(activeIndex - 1, 0))
  }

  const handleNext = () => {
    scrollToCertificate(Math.min(activeIndex + 1, certificates.length - 1))
  }

  const handleSliderScroll = () => {
    const slider = sliderRef.current
    if (!slider) return

    const closestIndex = Array.from(slider.children).reduce((closest, slide, index) => {
      const currentDistance = Math.abs(slide.offsetLeft - slider.scrollLeft)
      const closestDistance = Math.abs(slider.children[closest].offsetLeft - slider.scrollLeft)
      return currentDistance < closestDistance ? index : closest
    }, 0)

    setActiveIndex(closestIndex)
  }

  if (loading) {
    return (
      <section className="py-20 bg-[#fbf8f1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#17262d] mb-4">
              Certificates & Achievements
            </h2>
            <p className="text-lg text-[#5f665f]">Loading certificates...</p>
          </div>
        </div>
      </section>
    )
  }

  // Don't render section if no certificates
  if (certificates.length === 0) {
    return null
  }

  return (
    <section id="certificates" className="py-16 md:py-20 bg-[#fbf8f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#17262d] mb-4">
              Certificates & Achievements
            </h2>
            <p className="text-base md:text-lg text-[#5f665f] max-w-2xl mx-auto">
              Professional certifications that showcase my commitment to continuous learning 
              and skill development in various technologies.
            </p>
          </motion.div>
        </div>

        {/* Certificates Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="min-w-0 flex-[0_0_100%] snap-start sm:flex-[0_0_calc(50%_-_10px)] lg:flex-[0_0_calc(33.333%_-_14px)]"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  {/* Certificate Image */}
                  {certificate.image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Award Icon Overlay */}
                      <div className="absolute top-3 right-3 w-10 h-10 bg-[#d9952f] rounded-full flex items-center justify-center shadow-lg">
                        <Award className="text-white" size={20} />
                      </div>
                    </div>
                  )}

                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      {/* Award Icon for certificates without images */}
                      {!certificate.image && (
                        <div className="flex-shrink-0 w-10 h-10 bg-[#f4dfb9] rounded-lg flex items-center justify-center">
                          <Award className="text-[#9a621d]" size={20} />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">
                          {certificate.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar size={14} className="text-gray-500 flex-shrink-0" />
                          <span className="text-sm text-gray-500">
                            {new Date(certificate.created_at).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {certificates.length > 1 && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {certificates.map((certificate, index) => (
                  <button
                    key={certificate.id}
                    type="button"
                    onClick={() => scrollToCertificate(index)}
                    aria-label={`Go to certificate ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeIndex === index ? 'w-8 bg-[#2b766f]' : 'w-2 bg-[#d8cdb9] hover:bg-[#bcae97]'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  disabled={activeIndex === 0}
                  aria-label="Previous certificate"
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  disabled={activeIndex === certificates.length - 1}
                  aria-label="Next certificate"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
