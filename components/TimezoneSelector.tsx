'use client'

import { useState, useEffect } from 'react'

interface TimezoneSelectorProps {
  onTimezoneChange: (timezone: string) => void
}

export default function TimezoneSelector({ onTimezoneChange }: TimezoneSelectorProps) {
  const [selectedTimezone, setSelectedTimezone] = useState('UTC')
  const [isOpen, setIsOpen] = useState(false)

  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'EST (New York)' },
    { value: 'America/Los_Angeles', label: 'PST (Los Angeles)' },
    { value: 'Europe/London', label: 'GMT (London)' },
    { value: 'Europe/Paris', label: 'CET (Paris)' },
    { value: 'Asia/Tokyo', label: 'JST (Tokyo)' },
    { value: 'Asia/Shanghai', label: 'CST (Shanghai)' },
    { value: 'Australia/Sydney', label: 'AEST (Sydney)' },
  ]

  useEffect(() => {
    // Auto-detect user's timezone
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setSelectedTimezone(detectedTimezone)
    onTimezoneChange(detectedTimezone)
  }, [onTimezoneChange])

  const handleTimezoneChange = (timezone: string) => {
    setSelectedTimezone(timezone)
    onTimezoneChange(timezone)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-800/50 backdrop-blur-md text-gray-300 text-sm font-medium rounded-lg border border-gray-700 hover:border-primary/50 hover:text-primary transition-all duration-300"
      >
        🌍 {timezones.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl z-50">
          <div className="p-2">
            {timezones.map((timezone) => (
              <button
                key={timezone.value}
                onClick={() => handleTimezoneChange(timezone.value)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                  selectedTimezone === timezone.value
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                {timezone.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
