'use client'

import { useState, useEffect } from 'react'

const themes = [
  { name: 'Dark', bg: '#0D0D0D', text: '#FFFFFF', accent: '#00D4FF' },
  { name: 'Black', bg: '#000000', text: '#FFFFFF', accent: '#FFFFFF' },
  { name: 'White', bg: '#F5F5F5', text: '#000000', accent: '#0066CC' },
  { name: 'Purple', bg: '#1A0033', text: '#E0D4FF', accent: '#9D4EDD' },
  { name: 'Blue', bg: '#001529', text: '#E0F0FF', accent: '#1890FF' },
  { name: 'Red', bg: '#1F0000', text: '#FFE0E0', accent: '#DC143C' },
  { name: 'Green', bg: '#001F0A', text: '#E0FFE8', accent: '#00C853' },
  { name: 'Orange', bg: '#1F1400', text: '#FFF0E0', accent: '#FF8C00' },
  { name: 'Cyan', bg: '#001F1F', text: '#E0FFFF', accent: '#00E5FF' },
  { name: 'Pink', bg: '#1F0014', text: '#FFE0F5', accent: '#FF1493' },
  { name: 'Yellow', bg: '#1F1A00', text: '#FFFEF0', accent: '#FFD700' },
  { name: 'Indigo', bg: '#0A001F', text: '#E0E0FF', accent: '#6610F2' },
  { name: 'Teal', bg: '#001F14', text: '#E0FFF5', accent: '#20C997' },
  { name: 'Brown', bg: '#1A0F00', text: '#F5E8E0', accent: '#8B4513' },
  { name: 'Gray', bg: '#1A1A1A', text: '#E0E0E0', accent: '#6C757D' },
]

export default function ThemeSelector() {
  const [selected, setSelected] = useState('Dark')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      const theme = themes.find(t => t.name === saved)
      if (theme) {
        setSelected(saved)
        applyTheme(theme)
      }
    }
  }, [])

  const applyTheme = (theme: typeof themes[0]) => {
    document.documentElement.style.setProperty('--theme-bg', theme.bg)
    document.documentElement.style.setProperty('--theme-text', theme.text)
    document.documentElement.style.setProperty('--theme-accent', theme.accent)
    document.body.style.background = theme.bg
    document.body.style.color = theme.text
  }

  const handleSelect = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName)
    if (theme) {
      setSelected(themeName)
      localStorage.setItem('theme', themeName)
      applyTheme(theme)
      setIsOpen(false)
    }
  }

  const currentTheme = themes.find(t => t.name === selected) || themes[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#fff',
          transition: 'all 0.25s ease-in-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
        }}
      >
        <div 
          className="w-4 h-4 rounded-full"
          style={{ background: currentTheme.accent }}
        />
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
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            width: '200px'
          }}
        >
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleSelect(theme.name)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all"
              style={{
                background: selected === theme.name ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: '#fff',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => {
                if (selected !== theme.name) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== theme.name) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <div 
                className="w-5 h-5 rounded-full"
                style={{ 
                  background: theme.accent,
                  boxShadow: `0 0 10px ${theme.accent}80`
                }}
              />
              <span>{theme.name}</span>
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

