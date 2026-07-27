"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import IconCloud from './IconCloud'
import { 
  Code2, Database, Layers
} from 'lucide-react'

export default function SkillsSection() {
  const [mounted, setMounted] = useState(false)

  const skillGroups = [
    {
      title: 'Core technologies',
      description: 'Tools I use regularly to build production web systems.',
      icon: Code2,
      items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'PHP', 'WordPress']
    },
    {
      title: 'Working experience',
      description: 'Technologies I have used across real project requirements.',
      icon: Database,
      items: ['Node.js', 'Supabase', 'MongoDB', 'PostgreSQL', 'WooCommerce']
    },
    {
      title: 'Additional exposure',
      description: 'Adjacent tools and platforms I can work with when projects need them.',
      icon: Layers,
      items: ['React Native', 'Flutter', 'Dart', 'Docker', 'Vercel']
    }
  ]

  // Icon slugs for the cloud (Simple Icons slugs)
  const iconSlugs = [
    'html5',
    'css3', 
    'javascript',
    'typescript',
    'jquery',
    'php',
    'mysql',
    'mongodb',
    'postgresql',
    'supabase',
    'react',
    'nextdotjs',
    'python',
    'django',
    'wordpress',
    'woocommerce',
    'shopify',
    'react',
    'flutter',
    'dart',
    'nodejs',
    'tailwindcss',
    'bootstrap',
    'git',
    'github',
    'vercel',
    'docker'
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Icon Cloud Visualization
  const SkillsVisualization = () => {
    return (
      <div className="relative flex h-[320px] w-full items-center justify-center overflow-hidden sm:h-[380px] lg:h-full lg:min-h-[520px]">
        {/* Background */}
        <div className="absolute inset-0 rounded-2xl"></div>
        
        {/* Icon Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <IconCloud iconSlugs={iconSlugs} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-gray-200"
        >
          <div className="text-center">
            <div className="text-lg font-bold text-[#2b766f]">{iconSlugs.length}+</div>
            <div className="text-xs text-[#6c675d]">Technologies</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-gray-200"
        >
          <div className="text-center">
            <div className="text-sm font-bold text-[#d9952f]">Production</div>
            <div className="text-xs text-[#6c675d]">Focused</div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!mounted) {
    return (
      <section className="py-16 md:py-20 bg-[#f7f2e8]">
        <div className="px-5 sm:px-8 md:px-10 lg:px-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <p className="text-base md:text-lg text-[#5f665f]">Loading skills...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-20 bg-[#fbf8f1]">
      <div className="px-5 sm:px-8 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#17262d] mb-4">
              Skills & Technologies
            </h2>
            <p className="text-base md:text-lg text-[#5f665f] max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise across various domains
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 lg:items-stretch">
          {/* Left Side - Interactive Icon Cloud */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 lg:h-full"
          >
            <SkillsVisualization />
          </motion.div>

          {/* Right Side - Capability Groups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-4">
              {skillGroups.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-lg border border-[#e3d9c8] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#17313b]">
                      <group.icon className="text-white" size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#17262d]">
                        {group.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#5f665f]">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-[#d8cdb9] bg-[#f7f2e8] px-3 py-1.5 text-sm font-medium text-[#3e4948]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
