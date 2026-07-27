"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IconCloud from './IconCloud'
import { 
  Code2, Database, Palette, Server, Globe, 
  Zap, FileCode, Cpu, Settings, Monitor,
  Layers, ShoppingCart, Puzzle, Terminal,
  Braces, Github, Container
} from 'lucide-react'

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const [mounted, setMounted] = useState(false)

  // Skills data organized by category with proper icons
  const skillsData = {
    'Frontend': [
      // { name: 'HTML', level: 95, icon: Globe },
      { name: 'Tailwind', level: 90, icon: Palette },
      { name: 'JavaScript & jQuery', level: 88, icon: Code2 },
      { name: 'ReactJS', level: 90, icon: Layers },
      { name: 'NextJS', level: 87, icon: Monitor }
    ],
    'Backend': [
      { name: 'PHP', level: 85, icon: Server },
      { name: 'Python & Django', level: 80, icon: Terminal },
      { name: 'Node.js', level: 78, icon: Cpu }
    ],
    'Database': [
      { name: 'MYSQL', level: 85, icon: Database },
      { name: 'MongoDB', level: 80, icon: Database },
      { name: 'Supabase', level: 88, icon: Zap }
    ],
    'CMS': [
      { name: 'WordPress Development', level: 92, icon: FileCode },
      { name: 'Shopify', level: 82, icon: ShoppingCart }
    ],
    'Languages': [
      { name: 'JavaScript', level: 88, icon: Braces },
      { name: 'PHP', level: 85, icon: Code2 },
      { name: 'Python', level: 80, icon: Terminal },
      { name: 'SQL', level: 85, icon: Database }
    ],
    'Tools': [
      { name: 'GitHub', level: 60, icon: Github },
      { name: 'Vercel', level: 85, icon: Zap },
      { name: 'Docker', level: 40, icon: Container }
    ]
  }

  // Icon slugs for the cloud (Simple Icons slugs)
  const iconSlugs = [
    'html5',
    'css3', 
    'javascript',
    'jquery',
    'php',
    'mysql',
    'mongodb',
    'supabase',
    'react',
    'nextdotjs',
    'python',
    'django',
    'wordpress',
    'shopify',
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

  const categories = Object.keys(skillsData)

  // Icon Cloud Visualization
  const SkillsVisualization = () => {
    return (
      <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#efe6d7]/70 rounded-2xl border border-[#d8cdb9]"></div>
        
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
            <div className="text-lg font-bold text-[#d9952f]">2+</div>
            <div className="text-xs text-[#6c675d]">Years Exp</div>
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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Side - Interactive Icon Cloud */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <SkillsVisualization />
          </motion.div>

          {/* Right Side - Categorized Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-[#2b766f] text-white shadow-lg'
                      : 'bg-white text-[#5f665f] hover:bg-[#efe6d7] border border-[#d8cdb9]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Skills List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {skillsData[activeCategory].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 shadow-sm border border-[#e3d9c8] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#17313b] rounded-lg flex items-center justify-center">
                          <skill.icon className="text-white" size={16} />
                        </div>
                        <span className="font-semibold text-[#17262d]">{skill.name}</span>
                      </div>
                      <span className="text-sm text-[#6c675d] font-medium">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-[#e3d9c8] rounded-full h-2">
                      <motion.div
                        className="bg-[#2b766f] h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <div className="bg-[#17313b] rounded-lg p-4 text-white text-center">
                <div className="text-2xl font-bold">{iconSlugs.length}+</div>
                <div className="text-sm opacity-90">Technologies</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
