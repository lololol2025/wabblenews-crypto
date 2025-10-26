'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const timezones = [
  { value: 'America/New_York', label: 'EST (New York)', offset: 'UTC-5' },
  { value: 'America/Los_Angeles', label: 'PST (Los Angeles)', offset: 'UTC-8' },
  { value: 'Europe/London', label: 'GMT (London)', offset: 'UTC+0' },
  { value: 'Europe/Paris', label: 'CET (Paris)', offset: 'UTC+1' },
  { value: 'Asia/Tokyo', label: 'JST (Tokyo)', offset: 'UTC+9' },
  { value: 'Asia/Shanghai', label: 'CST (Shanghai)', offset: 'UTC+8' },
  { value: 'Australia/Sydney', label: 'AEST (Sydney)', offset: 'UTC+10' },
]

export default function TimezoneSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(timezones[0])

  useEffect(() => {
    const saved = localStorage.getItem('timezone')
    if (saved) {
      const tz = timezones.find(t => t.value === saved)
      if (tz) setSelected(tz)
    } else {
      // Auto-detect timezone
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
      const tz = timezones.find(t => t.value === detected)
      if (tz) {
        setSelected(tz)
        localStorage.setItem('timezone', tz.value)
      }
    }
  }, [])

  const handleSelect = (tz: typeof timezones[0]) => {
    setSelected(tz)
    localStorage.setItem('timezone', tz.value)
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
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-semibold text-white">{selected.offset}</span>
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
              className="absolute top-full mt-2 right-0 w-56 glass-effect rounded-lg border border-gray-700 shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto scrollbar-hide"
            >
              {timezones.map((tz) => (
                <button
                  key={tz.value}
                  onClick={() => handleSelect(tz)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--color-accent-primary)]/10 transition-colors text-left"
                >
                  <div>
                    <div className="text-sm font-medium text-white">{tz.label}</div>
                    <div className="text-xs text-gray-400">{tz.offset}</div>
                  </div>
                  {selected.value === tz.value && (
                    <svg className="w-4 h-4 text-[var(--color-accent-primary)]" fill="currentColor" viewBox="0 0 20 20">
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
