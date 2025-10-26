'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
]

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(languages[0])

  useEffect(() => {
    const saved = localStorage.getItem('language')
    if (saved) {
      const lang = languages.find(l => l.code === saved)
      if (lang) setSelected(lang)
    }
  }, [])

  const handleSelect = (lang: typeof languages[0]) => {
    setSelected(lang)
    localStorage.setItem('language', lang.code)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-[var(--color-accent-primary)]/50 transition-all duration-300"
      >
        <span className="text-2xl">{selected.flag}</span>
        <span className="text-sm font-semibold text-white">{selected.code.toUpperCase()}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 right-0 w-48 glass-effect rounded-lg border border-gray-700 shadow-xl z-50 overflow-hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-accent-primary)]/10 transition-colors text-left"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-sm font-medium text-white">{lang.name}</span>
                  {selected.code === lang.code && (
                    <svg className="w-4 h-4 ml-auto text-[var(--color-accent-primary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
