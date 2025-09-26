"use client"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Mail,
      title: "Email",
      detail: "your.email@example.com",
      link: "mailto:your.email@example.com"
    },
    {
      icon: Phone,
      title: "Phone",
      detail: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "New York, NY, USA",
      link: null
    },
    {
      icon: Clock,
      title: "Response Time",
      detail: "Usually within 24 hours",
      link: null
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl">Let's Connect</CardTitle>
          <p className="text-gray-600">
            I&apos;m always open to discussing new opportunities, creative projects, 
            or potential collaborations.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {contactDetails.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <item.icon className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                {item.link ? (
                  <a 
                    href={item.link}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.detail}
                  </a>
                ) : (
                  <p className="text-gray-600">{item.detail}</p>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Social Links */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Follow Me</h3>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/yourhandle" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
              >
                <span className="text-lg">🐦</span>
              </a>
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
              >
                <span className="text-lg">💼</span>
              </a>
              <a 
                href="https://github.com/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
              >
                <span className="text-lg">💻</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}