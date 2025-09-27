"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Award, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { supabase } from '../lib/supabase'

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certificates & Achievements
            </h2>
            <p className="text-lg text-gray-600">Loading certificates...</p>
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certificates & Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional certifications that showcase my commitment to continuous learning 
              and skill development in various technologies.
            </p>
          </motion.div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
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
                    <div className="absolute top-3 right-3 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="text-white" size={20} />
                    </div>
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    {/* Award Icon for certificates without images */}
                    {!certificate.image && (
                      <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Award className="text-yellow-600" size={20} />
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
                      
                      <Badge variant="secondary" className="w-full justify-center">
                        {certificate.issuer}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {certificates.length}+
            </div>
            <div className="text-gray-600">Certificates</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {new Set(certificates.map(cert => cert.issuer)).size}+
            </div>
            <div className="text-gray-600">Organizations</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {new Date().getFullYear() - Math.min(...certificates.map(cert => new Date(cert.created_at).getFullYear())) + 1}+
            </div>
            <div className="text-gray-600">Years Learning</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              100%
            </div>
            <div className="text-gray-600">Commitment</div>
          </div>
        </motion.div>

        {/* View All Button */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="group">
              <Link href="/certificates" className="flex items-center gap-2">
                View All Certificates
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}