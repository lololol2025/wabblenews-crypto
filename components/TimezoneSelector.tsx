'use client'

import { useState, useEffect } from 'react'

const timezones = [
  { value: 'UTC-12', label: 'UTC-12 (Baker Island)', offset: -12 },
  { value: 'UTC-11', label: 'UTC-11 (American Samoa, Niue)', offset: -11 },
  { value: 'UTC-10', label: 'UTC-10 (Hawaii, Tahiti)', offset: -10 },
  { value: 'UTC-9', label: 'UTC-9 (Alaska)', offset: -9 },
  { value: 'UTC-8', label: 'UTC-8 (Los Angeles, Vancouver, Mexico)', offset: -8 },
  { value: 'UTC-7', label: 'UTC-7 (Denver, Phoenix, Calgary)', offset: -7 },
  { value: 'UTC-6', label: 'UTC-6 (Chicago, Mexico City, Guatemala)', offset: -6 },
  { value: 'UTC-5', label: 'UTC-5 (New York, Toronto, Lima)', offset: -5 },
  { value: 'UTC-4', label: 'UTC-4 (Atlantic, Venezuela, Bolivia)', offset: -4 },
  { value: 'UTC-3', label: 'UTC-3 (Buenos Aires, São Paulo, Santiago)', offset: -3 },
  { value: 'UTC-2', label: 'UTC-2 (Mid-Atlantic, South Georgia)', offset: -2 },
  { value: 'UTC-1', label: 'UTC-1 (Azores, Cape Verde)', offset: -1 },
  { value: 'UTC+0', label: 'UTC+0 (London, Dublin, Lisbon, Ghana)', offset: 0 },
  { value: 'UTC+1', label: 'UTC+1 (Germany, France, Italy, Spain)', offset: 1 },
  { value: 'UTC+2', label: 'UTC+2 (Egypt, South Africa, Greece)', offset: 2 },
  { value: 'UTC+3', label: 'UTC+3 (Turkey, Saudi Arabia, Russia, Kenya)', offset: 3 },
  { value: 'UTC+4', label: 'UTC+4 (Dubai, Abu Dhabi, Armenia)', offset: 4 },
  { value: 'UTC+5', label: 'UTC+5 (Pakistan, Uzbekistan)', offset: 5 },
  { value: 'UTC+5:30', label: 'UTC+5:30 (India, Sri Lanka)', offset: 5.5 },
  { value: 'UTC+6', label: 'UTC+6 (Bangladesh, Kazakhstan)', offset: 6 },
  { value: 'UTC+7', label: 'UTC+7 (Thailand, Vietnam, Indonesia)', offset: 7 },
  { value: 'UTC+8', label: 'UTC+8 (China, Singapore, Philippines)', offset: 8 },
  { value: 'UTC+9', label: 'UTC+9 (Japan, South Korea)', offset: 9 },
  { value: 'UTC+9:30', label: 'UTC+9:30 (Australia - Darwin)', offset: 9.5 },
  { value: 'UTC+10', label: 'UTC+10 (Australia - Sydney, Papua New Guinea)', offset: 10 },
  { value: 'UTC+11', label: 'UTC+11 (Solomon Islands, New Caledonia)', offset: 11 },
  { value: 'UTC+12', label: 'UTC+12 (New Zealand, Fiji)', offset: 12 },
  { value: 'UTC+13', label: 'UTC+13 (Samoa, Tonga)', offset: 13 },
  { value: 'UTC+14', label: 'UTC+14 (Kiribati, Line Islands)', offset: 14 },
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
            background: 'rgba(13, 13, 13, 0.98)',
            border: '1px solid rgba(127, 255, 0, 0.3)',
            backdropFilter: 'blur(20px)',
            maxHeight: '400px',
            overflowY: 'auto',
            width: '340px'
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
