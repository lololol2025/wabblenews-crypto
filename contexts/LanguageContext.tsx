'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { LanguageCode, TranslationKey, getTranslation } from '@/lib/translations'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: TranslationKey) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const RTL_LANGUAGES: LanguageCode[] = ['ar', 'he']

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en')
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('language') as LanguageCode
    if (saved) {
      setLanguageState(saved)
      setIsRTL(RTL_LANGUAGES.includes(saved))
      updateDirection(saved)
    }
  }, [])

  const updateDirection = (lang: LanguageCode) => {
    const isRightToLeft = RTL_LANGUAGES.includes(lang)
    document.documentElement.dir = isRightToLeft ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    const isRightToLeft = RTL_LANGUAGES.includes(lang)
    setIsRTL(isRightToLeft)
    updateDirection(lang)
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'))
  }

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

