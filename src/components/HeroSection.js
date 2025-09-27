"use client"
import { Button } from "./ui/button"
import { Download, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Hi, I&apos;m{' '}
                <span className="text-blue-600">Sanwal Bajwa</span>
              </h1>
              
              <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
                Software Dev @ CodesFix | Pursuing Computer Science
              </h2>
              
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                Full Stack Developer with over 2+ years of hands-on experience, currently working as a WordPress Developer at CodesFix. 
                I specialize in WordPress Development and have growing expertise in Next.js and JavaScript technologies. Passionate about clean code, performance optimization, and building scalable, user-friendly applications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button size="lg" className="flex items-center gap-2 group">
                <Download size={18} />
                Download CV
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" asChild className="group">
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail size={18} />
                  Contact Me
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link 
                href="/portfolio" 
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors"
              >
                View My Work 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
              <Link 
                href="/blog" 
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors"
              >
                Read My Blog 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </motion.div>
          </motion.div>

{/* Right Side - Professional Hero Image */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="order-1 lg:order-2 flex justify-center"
>
  <div className="relative">
    {/* Main Image Container */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-80 h-80 lg:w-96 lg:h-96"
    >
      {/* Professional Background with Geometric Shapes */}
      <div className="absolute inset-0">
        {/* Primary Background Circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full"></div>
        
        {/* Geometric Elements */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-8 -right-8 w-16 h-16 border-2 border-blue-500/20 rounded-lg"
        ></motion.div>
        
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-purple-500/20 rounded-full"
        ></motion.div>
        
        {/* Dotted Pattern */}
        <div className="absolute top-12 right-12 grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut" 
              }}
              className="w-2 h-2 bg-blue-500/30 rounded-full"
            />
          ))}
        </div>
      </div>
      
      {/* Professional Image Frame */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl bg-white p-2">
        <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src="/hero-image.png"
            alt="Sanwal Bajwa - Software Developer"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Professional Tech Stack Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute -top-6 left-8 bg-white rounded-lg shadow-lg px-3 py-2 border border-gray-100"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Available for work</span>
          </div>
        </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-1/4 -right-12 bg-white rounded-lg shadow-lg p-3 border border-gray-100"
      >
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">2+</div>
          <div className="text-xs text-gray-600">Years Exp</div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-1/4 -left-12 bg-white rounded-lg shadow-lg p-3 border border-gray-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">WP</span>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-700">WordPress</div>
            <div className="text-xs text-gray-500">Expert</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute -bottom-8 right-12 bg-white rounded-lg shadow-lg p-3 border border-gray-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">JS</span>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-700">Next.js</div>
            <div className="text-xs text-gray-500">Growing</div>
          </div>
        </div>
      </motion.div>

      {/* Subtle Code Elements */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-8 left-4 text-gray-300 text-xs font-mono"
      >
        &lt;code/&gt;
      </motion.div>
      
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-12 right-4 text-gray-300 text-xs font-mono"
      >
        {`{ }`}
      </motion.div>
    </motion.div>

    {/* Professional Background Glow */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
    </div>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  )
}