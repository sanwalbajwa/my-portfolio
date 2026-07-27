"use client"
import { Button } from "./ui/button"
import { Download, Mail, ArrowRight, Github, Linkedin, BadgeCheck, Braces, Code2, FileCode2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '../lib/supabase'

export default function HeroSection() {
  const downloadCV = async () => {
    try {
      const { data: activeCV, error } = await supabase
        .from('cv_management')
        .select('*')
        .eq('is_active', true)
        .single()

      if (error || !activeCV) {
        alert('CV not available at the moment. Please try again later.')
        return
      }

      const { data: fileData, error: downloadError } = await supabase.storage
        .from('documents')
        .download(activeCV.filename)

      if (downloadError) throw downloadError

      const blob = new Blob([fileData], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = activeCV.original_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error('Download error:', error)
      alert('Sorry, CV download failed. Please try again.')
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f2e8] py-14 md:py-20 lg:min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(217,149,47,0.16),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(43,118,111,0.13),transparent_26%)]" />
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12">
        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#17262d] mb-6 leading-tight">
                Hi, I&apos;m{' '}
                <span className="text-[#2b766f]">Sanwal Bajwa</span>
              </h1>
              
              <h2 className="text-lg sm:text-xl md:text-2xl text-[#5f665f] mb-6 md:mb-8">
                Software Developer | Builds Web and Mobile Apps
              </h2>
              
              <p className="text-base md:text-lg text-[#3e4948] mb-8 md:mb-10 leading-relaxed">
                Full-Stack Developer with 2+ years of hands-on experience, currently working as a Software Developer, where I build scalable, performance-driven web solutions.
                My core expertise lies in PHP, WordPress (custom plugins, themes, WooCommerce) and Next.js, with strong working knowledge of Node.js and modern JavaScript ecosystems.
                <br></br><br></br>
                On the mobile side, I&apos;m expanding into React Native, backed by prior experience with Flutter & Dart, giving me a solid cross-platform development mindset.
                I focus on clean architecture, optimized performance, and maintainable code, turning business requirements into reliable, user-friendly applications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-10"
            >
              <Button 
                size="lg" 
                className="flex items-center gap-2 group"
                onClick={downloadCV}
              >
                <Download size={18} />
                Download CV
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" asChild className="group">
                <Link href="#contact" className="flex items-center gap-2">
                  <Mail size={18} />
                  Contact Me
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Social Links - Styled to match theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 mb-8 md:mb-10"
            >
              <a 
                href="https://github.com/sanwalbajwa/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/80 border border-[#d8cdb9] text-[#3e4948] hover:text-[#17262d] hover:border-[#bcae97] hover:shadow-md transition-all duration-300 group"
                aria-label="GitHub Profile"
              >
                <Github size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.linkedin.com/in/sanwal-bajwa/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/80 border border-[#d8cdb9] text-[#2b766f] hover:text-[#1e5f59] hover:border-[#8fb3ad] hover:shadow-md transition-all duration-300 group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link 
                href="/portfolio" 
                className="flex items-center text-[#2b766f] hover:text-[#17313b] font-medium group transition-colors"
              >
                View My Work 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
              <Link 
                href="/blog" 
                className="flex items-center text-[#2b766f] hover:text-[#17313b] font-medium group transition-colors"
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
                className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              >
                {/* Professional Background with Geometric Shapes */}
                <div className="absolute inset-0">
                  {/* Primary Background Circle */}
                  <div className="absolute inset-0 bg-[#d9952f]/10 rounded-full"></div>
                  
                  {/* Geometric Elements */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-5 -right-3 sm:-top-8 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 border-2 border-[#2b766f]/25 rounded-lg"
                  ></motion.div>
                  
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#d9952f]/35 rounded-full"
                  ></motion.div>
                  
                  {/* Dotted Pattern */}
                  <div className="absolute top-10 right-10 sm:top-12 sm:right-12 grid grid-cols-3 gap-2">
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
                        className="w-2 h-2 bg-[#2b766f]/35 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                
                {/* Professional Image Frame */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#d8cdb9] shadow-2xl bg-white/85 p-2">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-[#efe6d7]">
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
                  className="absolute -top-4 left-4 sm:-top-6 sm:left-8 bg-white/95 rounded-lg shadow-lg px-3 py-2 border border-[#d8cdb9]"
                >
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="text-[#2b766f]" size={16} />
                    <span className="text-sm font-medium text-[#3e4948]">Available for work</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute top-5 right-2 sm:top-1/4 sm:-right-8 lg:-right-12 bg-white/95 rounded-lg shadow-lg p-3 border border-[#d8cdb9]"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#2b766f]">2+</div>
                    <div className="text-xs text-[#6c675d]">Years Exp</div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute bottom-16 left-0 sm:bottom-1/4 sm:-left-8 lg:-left-12 bg-white/95 rounded-lg shadow-lg p-3 border border-[#d8cdb9]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#17313b] rounded-lg flex items-center justify-center">
                      <FileCode2 className="text-white" size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-[#3e4948]">WordPress</div>
                      <div className="text-xs text-[#6c675d]">Expert</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="absolute -bottom-5 right-4 sm:-bottom-8 sm:right-12 bg-white/95 rounded-lg shadow-lg p-3 border border-[#d8cdb9]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#2b766f] rounded-lg flex items-center justify-center">
                      <Braces className="text-white" size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-[#3e4948]">Next.js & React</div>
                      <div className="text-xs text-[#6c675d]">Expert</div>
                    </div>
                  </div>
                </motion.div>

                {/* Subtle Code Elements */}
                <motion.div
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 left-4 text-[#bcae97] text-xs font-mono"
                >
                  <Code2 size={18} />
                </motion.div>
                
                <motion.div
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-12 right-4 text-[#bcae97] text-xs font-mono"
                >
                  <Braces size={18} />
                </motion.div>
              </motion.div>

              {/* Professional Background Glow */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#2b766f]/15 rounded-full blur-3xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
