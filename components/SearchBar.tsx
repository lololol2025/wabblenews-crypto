'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, content, or category..."
          className="w-full pl-12 pr-24 py-4 rounded-xl text-white font-medium transition-all duration-300 focus:outline-none"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.7)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.3)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #00D4FF, #00A8E8)',
            color: '#000',
            boxShadow: '0 4px 12px rgba(0, 212, 255, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 212, 255, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.3)'
          }}
        >
          Search
        </button>
      </div>
    </form>
  )
}

