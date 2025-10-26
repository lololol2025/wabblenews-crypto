'use client'

import { useState, useEffect } from 'react'

const timezones = [
  { value: 'UTC-12', label: 'UTC-12:00 (Baker Island)', offset: -12 },
  { value: 'UTC-11', label: 'UTC-11:00 (American Samoa)', offset: -11 },
  { value: 'UTC-10', label: 'UTC-10:00 (Hawaii)', offset: -10 },
  { value: 'UTC-9', label: 'UTC-09:00 (Alaska)', offset: -9 },
  { value: 'UTC-8', label: 'UTC-08:00 (PST - Los Angeles)', offset: -8 },
  { value: 'UTC-7', label: 'UTC-07:00 (MST - Denver)', offset: -7 },
  { value: 'UTC-6', label: 'UTC-06:00 (CST - Chicago)', offset: -6 },
  { value: 'UTC-5', label: 'UTC-05:00 (EST - New York)', offset: -5 },
  { value: 'UTC-4', label: 'UTC-04:00 (AST - Atlantic)', offset: -4 },
  { value: 'UTC-3', label: 'UTC-03:00 (Buenos Aires)', offset: -3 },
  { value: 'UTC-2', label: 'UTC-02:00 (Mid-Atlantic)', offset: -2 },
  { value: 'UTC-1', label: 'UTC-01:00 (Azores)', offset: -1 },
  { value: 'UTC+0', label: 'UTC+00:00 (London, GMT)', offset: 0 },
  { value: 'UTC+1', label: 'UTC+01:00 (Paris, Berlin)', offset: 1 },
  { value: 'UTC+2', label: 'UTC+02:00 (Cairo, Athens)', offset: 2 },
  { value: 'UTC+3', label: 'UTC+03:00 (Moscow, Istanbul)', offset: 3 },
  { value: 'UTC+4', label: 'UTC+04:00 (Dubai)', offset: 4 },
  { value: 'UTC+5', label: 'UTC+05:00 (Karachi)', offset: 5 },
  { value: 'UTC+5:30', label: 'UTC+05:30 (India)', offset: 5.5 },
  { value: 'UTC+6', label: 'UTC+06:00 (Dhaka)', offset: 6 },
  { value: 'UTC+7', label: 'UTC+07:00 (Bangkok)', offset: 7 },
  { value: 'UTC+8', label: 'UTC+08:00 (Beijing, Singapore)', offset: 8 },
  { value: 'UTC+9', label: 'UTC+09:00 (Tokyo, Seoul)', offset: 9 },
  { value: 'UTC+10', label: 'UTC+10:00 (Sydney)', offset: 10 },
  { value: 'UTC+11', label: 'UTC+11:00 (Solomon Islands)', offset: 11 },
  { value: 'UTC+12', label: 'UTC+12:00 (Auckland)', offset: 12 },
  { value: 'UTC+13', label: 'UTC+13:00 (Samoa)', offset: 13 },
  { value: 'UTC+14', label: 'UTC+14:00 (Kiribati)', offset: 14 },
]

export default function TimezoneSelector() {
  const [selected, setSelected] = useState('UTC+0')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('timezone')
    if (saved) {
      setSelected(saved)
    } else {
      // Auto-detect timezone
      const offset = -(new Date().getTimezoneOffset() / 60)
      const detected = timezones.find(tz => tz.offset === offset)
      if (detected) setSelected(detected.value)
    }
  }, [])

  const handleSelect = (value: string) => {
    setSelected(value)
    localStorage.setItem('timezone', value)
    setIsOpen(false)
  }

  const currentTz = timezones.find(tz => tz.value === selected) || timezones[12]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm"
        style={{
          background: 'rgba(127, 255, 0, 0.1)',
          border: '1px solid rgba(127, 255, 0, 0.3)',
          color: '#7FFF00',
          transition: 'all 0.25s ease-in-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(127, 255, 0, 0.2)'
          e.currentTarget.style.borderColor = 'rgba(127, 255, 0, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(127, 255, 0, 0.1)'
          e.currentTarget.style.borderColor = 'rgba(127, 255, 0, 0.3)'
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{selected}</span>
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
            border: '1px solid rgba(127, 255, 0, 0.3)',
            backdropFilter: 'blur(20px)',
            maxHeight: '400px',
            overflowY: 'auto',
            width: '280px'
          }}
        >
          {timezones.map((tz) => (
            <button
              key={tz.value}
              onClick={() => handleSelect(tz.value)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all text-left"
              style={{
                background: selected === tz.value ? 'rgba(127, 255, 0, 0.2)' : 'transparent',
                color: selected === tz.value ? '#7FFF00' : '#fff',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => {
                if (selected !== tz.value) {
                  e.currentTarget.style.background = 'rgba(127, 255, 0, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== tz.value) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <span>{tz.label}</span>
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
