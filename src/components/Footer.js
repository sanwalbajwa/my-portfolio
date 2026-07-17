import Link from 'next/link'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#17313b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left - Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Sanwal Bajwa</h3>
            <p className="text-[#b7c4bf] mb-4">
              Full Stack Developer & continuous learner.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/sanwalbajwa/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b7c4bf] hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/sanwal-bajwa/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b7c4bf] hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:hello@sanwalbajwa.com"
                className="text-[#b7c4bf] hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Center - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/portfolio" className="text-[#b7c4bf] hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#b7c4bf] hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#certificates" className="text-[#b7c4bf] hover:text-white transition-colors">
                  Certificates
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[#b7c4bf] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right - Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-[#b7c4bf]">
              <p>hello@sanwalbajwa.com</p>
              <p>Lahore, Pakistan</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 text-[#b7c4bf]">
            <span>Copyright {currentYear} Sanwal Bajwa. Made with</span>
            <Heart size={16} className="text-red-500" />
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-[#b7c4bf] hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#b7c4bf] hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
