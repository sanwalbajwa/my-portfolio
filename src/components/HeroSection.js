"use client"
import { Button } from "./ui/button"
import { Download, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Hi, I&apos;m{' '}
              <span className="text-blue-600">Sanwal Bajwa</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
              Full Stack Developer
            </h2>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
              I create modern web applications with clean code and beautiful designs. 
              Passionate about turning ideas into digital reality using cutting-edge technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="flex items-center gap-2">
              <Download size={18} />
              Download CV
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact" className="flex items-center gap-2">
                <Mail size={18} />
                Contact Me
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex justify-center gap-6"
          >
            <Link href="/portfolio" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View My Work <ArrowRight className="ml-2" size={16} />
            </Link>
            <Link href="/blog" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              Read My Blog <ArrowRight className="ml-2" size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}