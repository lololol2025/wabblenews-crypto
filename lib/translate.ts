// Translation utility using LibreTranslate API
// Free API endpoint: https://libretranslate.com/translate

const LIBRE_TRANSLATE_API = 'https://libretranslate.com/translate'

// Cache translations in memory and localStorage
const translationCache = new Map<string, string>()

// Language code mapping
const languageMap: Record<string, string> = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
  ru: 'ru',
  ja: 'ja',
  ar: 'ar',
  he: 'he',
  tr: 'tr',
}

export async function translateText(text: string, targetLang: string): Promise<string> {
  // Don't translate if target is English or if text is empty
  if (!text || targetLang === 'en') return text

  // Create cache key
  const cacheKey = `${text}_${targetLang}`
  
  // Check memory cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  // Check localStorage cache
  try {
    const localCache = localStorage.getItem(`translate_${cacheKey}`)
    if (localCache) {
      translationCache.set(cacheKey, localCache)
      return localCache
    }
  } catch (e) {
    // localStorage not available
  }

  // Translate using API
  try {
    const response = await fetch(LIBRE_TRANSLATE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: languageMap[targetLang] || targetLang,
        format: 'text',
      }),
    })

    if (!response.ok) {
      console.error('Translation API error:', response.statusText)
      return text // Return original text on error
    }

    const data = await response.json()
    const translatedText = data.translatedText || text

    // Cache the result
    translationCache.set(cacheKey, translatedText)
    
    try {
      localStorage.setItem(`translate_${cacheKey}`, translatedText)
    } catch (e) {
      // localStorage full or not available
    }

    return translatedText
  } catch (error) {
    console.error('Translation error:', error)
    return text // Return original text on error
  }
}

// Batch translate multiple texts
export async function translateBatch(texts: string[], targetLang: string): Promise<string[]> {
  if (targetLang === 'en') return texts

  const promises = texts.map(text => translateText(text, targetLang))
  return Promise.all(promises)
}

// Clear translation cache
export function clearTranslationCache() {
  translationCache.clear()
  
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('translate_')) {
        localStorage.removeItem(key)
      }
    })
  } catch (e) {
    // localStorage not available
  }
}

