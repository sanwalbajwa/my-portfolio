"use client"

import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sanwal-bajwa/',
    icon: Linkedin
  },
  {
    label: 'GitHub',
    href: 'https://github.com/sanwalbajwa/',
    icon: Github
  }
]

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#f7f2e8]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto"
      >
        <div className="relative overflow-hidden border-y border-[#d8cdb9] bg-[#efe6d7] px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:px-12">
          <div className="absolute right-0 top-0 h-full w-24 bg-[#d9952f]/10 sm:w-40" />
          <div className="relative">
            <div className="mb-10 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d9952f]" />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2b766f] sm:text-sm">
                Contact
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-[#17262d] sm:text-5xl md:text-6xl lg:text-7xl">
                  Have a web or mobile idea that needs clean execution?
                </h2>
              </div>

              <div className="space-y-8 lg:justify-self-end">
                <a
                  href="mailto:hello@sanwalbajwa.com"
                  className="group inline-flex max-w-full items-center gap-3 border-b-2 border-[#2b766f] pb-2 text-2xl font-bold leading-tight text-[#17262d] transition-colors hover:text-[#2b766f] sm:text-3xl"
                >
                  <Mail className="size-6 shrink-0 text-[#2b766f]" aria-hidden="true" />
                  <span className="break-all">hello@sanwalbajwa.com</span>
                  <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </a>

                <div className="flex flex-wrap items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-md border border-[#d8cdb9] bg-white/60 px-4 py-3 text-sm font-medium text-[#3e4948] transition-all hover:border-[#2b766f] hover:text-[#2b766f] hover:shadow-sm"
                      aria-label={`${link.label} profile`}
                    >
                      <link.icon className="size-4" aria-hidden="true" />
                      <span>{link.label}</span>
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
