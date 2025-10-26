'use client'

import { useState, useEffect } from 'react'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
]

export default function LanguageSelector() {
  const [selected, setSelected] = useState('en')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('language')
    if (saved) setSelected(saved)
  }, [])

  const handleSelect = (code: string) => {
    setSelected(code)
    localStorage.setItem('language', code)
    setIsOpen(false)
  }

  const currentLang = languages.find(l => l.code === selected) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm"
        style={{
          background: 'rgba(0, 212, 255, 0.1)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          color: '#00D4FF',
          transition: 'all 0.25s ease-in-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)'
          e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'
          e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)'
        }}
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.code.toUpperCase()}</span>
        <svg 
          className="w-3 h-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease-in-out'
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 rounded-lg overflow-hidden shadow-2xl z-50"
          style={{
            background: 'rgba(20, 20, 20, 0.95)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            maxHeight: '400px',
            overflowY: 'auto',
            width: '200px'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all"
              style={{
                background: selected === lang.code ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                color: selected === lang.code ? '#00D4FF' : '#fff',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => {
                if (selected !== lang.code) {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== lang.code) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
