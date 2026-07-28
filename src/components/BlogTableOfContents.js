"use client"

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function BlogTableOfContents({ headings }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!headings || headings.length === 0) {
    return null
  }

  return (
    <>
      <aside className="hidden self-start lg:sticky lg:top-24 lg:block">
        <div className="max-h-[calc(100vh-7rem)] overflow-y-auto border-l border-[#d8cdb9] pl-5 pr-2">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#2b766f]">
            On this page
          </p>
          <nav className="space-y-2.5">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className="block text-sm leading-5 text-[#5f665f] transition-colors hover:text-[#2b766f]"
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div className="mb-8 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-lg border border-[#d8cdb9] bg-white px-4 py-3 text-left font-semibold text-[#17262d]"
          aria-expanded={isOpen}
        >
          <span>On this page</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <nav className="mt-2 rounded-lg border border-[#d8cdb9] bg-white p-4">
            <div className="space-y-3">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm leading-5 text-[#5f665f] transition-colors hover:text-[#2b766f]"
                >
                  {heading.text}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </>
  )
}
