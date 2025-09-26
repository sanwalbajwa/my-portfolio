"use client"
import { motion } from 'framer-motion'

export default function SkillsSection() {
  const skills = [
    { name: 'Next.js', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'Supabase', icon: '🚀' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'JavaScript', icon: '💛' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Git', icon: '📊' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600">
            Technologies I love working with
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors"
            >
              <div className="text-3xl mb-3">{skill.icon}</div>
              <h3 className="font-semibold text-gray-900">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}