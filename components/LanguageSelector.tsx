'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageCode } from '@/lib/translations'

const languages = [
  { code: 'en' as LanguageCode, name: 'English', flag: '🇬🇧' },
  { code: 'es' as LanguageCode, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as LanguageCode, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as LanguageCode, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru' as LanguageCode, name: 'Русский', flag: '🇷🇺' },
  { code: 'ja' as LanguageCode, name: '日本語', flag: '🇯🇵' },
  { code: 'ar' as LanguageCode, name: 'العربية', flag: '🇸🇦' },
  { code: 'he' as LanguageCode, name: 'עברית', flag: '🇮🇱' },
  { code: 'tr' as LanguageCode, name: 'Türkçe', flag: '🇹🇷' },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code)
    setIsOpen(false)
  }

  const currentLang = languages.find(l => l.code === language) || languages[0]

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
        <img src="/language-icon.png" alt="Language" className="w-5 h-5" />
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
            background: 'rgba(13, 13, 13, 0.98)',
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
                background: language === lang.code ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                color: language === lang.code ? '#00D4FF' : '#fff',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => {
                if (language !== lang.code) {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (language !== lang.code) {
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
