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
      { name: 'JavaScript', level: 88, icon: Zap },
      { name: 'jQuery', level: 85, icon: Code2 },
      { name: 'ReactJS', level: 90, icon: Layers },
      { name: 'NextJS', level: 87, icon: Monitor }
    ],
    'Backend': [
      { name: 'PHP', level: 85, icon: Server },
      { name: 'Python', level: 80, icon: Terminal },
      { name: 'Django', level: 75, icon: Settings },
      { name: 'Node.js', level: 78, icon: Cpu }
    ],
    'Database': [
      { name: 'SQL', level: 85, icon: Database },
      { name: 'MongoDB', level: 80, icon: Database },
      { name: 'Supabase', level: 88, icon: Zap }
    ],
    'CMS': [
      { name: 'WordPress Development', level: 92, icon: FileCode },
      { name: 'Plugin Development', level: 88, icon: Puzzle },
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
      <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl"></div>
        
        {/* Icon Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <IconCloud iconSlugs={iconSlugs} />
        </motion.div>

        {/* Floating info badges */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200"
        >
          <div className="text-center">
            <div className="text-sm text-gray-600">Interactive • Rotate with mouse</div>
          </div>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-gray-200"
        >
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{iconSlugs.length}+</div>
            <div className="text-xs text-gray-600">Technologies</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-gray-200"
        >
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">2+</div>
            <div className="text-xs text-gray-600">Years Exp</div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!mounted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600">Loading skills...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise across various domains
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
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
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <skill.icon className="text-white" size={16} />
                        </div>
                        <span className="font-semibold text-gray-900">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
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
              {/* <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white text-center">
                <div className="text-2xl font-bold">{categories.length}</div>
                <div className="text-sm opacity-90">Categories</div>
              </div> */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white text-center">
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