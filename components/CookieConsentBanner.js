import { useCookieConsent } from '@/context/CookieConsentContext'
import { useState, useEffect } from 'react'

function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}

export default function CookieConsentBanner() {
  const hydrated = useHydrated()
  const { consentSet, savePrefs, setShowSettings } = useCookieConsent()

  if (!hydrated || consentSet) return null // 🚫 Don't render until hydrated

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white p-4 shadow-lg z-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-700">
          We use cookies to enhance your browsing experience, serve personalized ads or content,
          and analyze traffic. You can manage your preferences anytime.
        </p>
        <div className="flex space-x-2">
          <button
            className="text-sm bg-green-700 text-white px-4 py-1.5 rounded hover:bg-green-800"
            onClick={() => savePrefs({ necessary: true, analytics: true, marketing: true })}
          >
            Accept All
          </button>
          <button
            className="text-sm bg-gray-100 px-4 py-1.5 rounded hover:bg-gray-200"
            onClick={() => savePrefs({ necessary: true })}
          >
            Only Necessary
          </button>
          <button
            className="text-sm underline text-gray-700"
            onClick={() => setShowSettings(true)}
          >
            Manage Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
