"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, Database, Palette, Server, Globe, 
  Zap, FileCode, Cpu, Settings, Monitor,
  Layers, ShoppingCart, Puzzle, Terminal,
  Braces
} from 'lucide-react'

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const [mounted, setMounted] = useState(false)

  // Skills data organized by category with proper icons
  const skillsData = {
    'Frontend': [
      { name: 'HTML', level: 95, icon: Globe },
      { name: 'CSS', level: 90, icon: Palette },
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
    ]
  }

  // All skills for the left side visualization
  const allSkills = [
    { name: 'HTML', icon: Globe, color: 'from-orange-400 to-red-500' },
    { name: 'CSS', icon: Palette, color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', icon: Zap, color: 'from-yellow-400 to-orange-500' },
    { name: 'ReactJS', icon: Layers, color: 'from-blue-500 to-cyan-500' },
    { name: 'NextJS', icon: Monitor, color: 'from-gray-600 to-gray-800' },
    { name: 'PHP', icon: Server, color: 'from-purple-500 to-indigo-600' },
    { name: 'Python', icon: Terminal, color: 'from-green-400 to-blue-500' },
    { name: 'MongoDB', icon: Database, color: 'from-green-500 to-green-700' },
    { name: 'WordPress', icon: FileCode, color: 'from-blue-600 to-purple-600' },
    { name: 'Shopify', icon: ShoppingCart, color: 'from-green-600 to-teal-600' }
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = Object.keys(skillsData)

// 3D Grid Layout with guaranteed spacing
const SkillsVisualization = () => {
  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
      </div>

      {/* 3D Grid Layout */}
      <div className="relative">
        {/* Grid Container with CSS Grid */}
        <div className="grid grid-cols-4 gap-8 items-center justify-center max-w-lg">
          {allSkills.slice(0, 8).map((skill, index) => {
            // Skip center positions to create space for central hub
            const isCenter = index === 1 || index === 2 || index === 5 || index === 6;
            
            if (isCenter) {
              return <div key={`spacer-${index}`} className="w-20 h-20" />; // Empty spacer
            }

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0,
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  y: {
                    duration: 3 + (index % 2),
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.2,
                  rotateY: 15,
                  z: 50,
                  transition: { duration: 0.2 }
                }}
                className="relative"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${skill.color} rounded-2xl shadow-lg flex items-center justify-center cursor-pointer transform transition-all duration-300 hover:shadow-2xl`}>
                  <skill.icon className="text-white" size={32} />
                </div>
                
                {/* Skill name tooltip */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {skill.name}
                </div>

                {/* Floating particles around each card */}
                <motion.div
                  className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Central Hub - Positioned absolutely in center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative pointer-events-auto">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center cursor-pointer"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.2 }}
            >
              <Code2 className="text-white" size={36} />
            </motion.div>
            
            {/* Tech count badge */}
            <motion.div
              className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {allSkills.length}
            </motion.div>
          </div>
        </motion.div>

        {/* Additional floating skills around the grid */}
        {allSkills.slice(8).map((skill, index) => {
          const positions = [
            { top: '10%', left: '20%' },
            { top: '20%', right: '15%' },
            { bottom: '20%', left: '15%' },
            { bottom: '10%', right: '20%' }
          ];
          
          const position = positions[index % positions.length];
          
          return (
            <motion.div
              key={`floating-${skill.name}`}
              className="absolute"
              style={position}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, 5, -5, 0],
                y: [0, -15, 0]
              }}
              transition={{
                duration: 0.8,
                delay: 1 + index * 0.2,
                rotate: { duration: 4, repeat: Infinity },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.3, rotate: 15 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-xl shadow-md flex items-center justify-center cursor-pointer`}>
                <skill.icon className="text-white" size={24} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                {skill.name}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
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
          {/* Left Side - Modern Skills Visualization */}
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
                <div className="text-2xl font-bold">{allSkills.length}+</div>
                <div className="text-sm opacity-90">Technologies</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}