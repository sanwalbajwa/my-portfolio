"use client"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Calendar } from 'lucide-react'

export default function CertificateCard({ certificate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300">
        {/* Certificate Image */}
        {certificate.image && (
          <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
            <Image
              src={certificate.image}
              alt={certificate.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start gap-2">
            <Award className="text-yellow-600 mt-1" size={20} />
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight">
                {certificate.title}
              </CardTitle>
              <div className="flex items-center gap-1 mt-2">
                <Calendar size={14} className="text-gray-500" />
                <p className="text-sm text-gray-500">
                  {new Date(certificate.created_at).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <Badge variant="secondary" className="w-full justify-center">
            {certificate.issuer}
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  )
}