import { activateDeferredScripts } from '@/lib/activateDeferredScripts'

import { createContext, useContext, useEffect, useState } from 'react'

const CookieConsentContext = createContext()

const defaultPrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
}

export function CookieConsentProvider({ children }) {
  const [prefs, setPrefs] = useState(defaultPrefs)
  const [consentSet, setConsentSet] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent')
    if (stored) {
      setPrefs(JSON.parse(stored))
      setConsentSet(true)
    }
  }, [])

const savePrefs = newPrefs => {
  const merged = { ...defaultPrefs, ...newPrefs }
  setPrefs(merged)
  setConsentSet(true)
  localStorage.setItem('cookie_consent', JSON.stringify(merged))

  // Activate scripts
  const allowed = Object.keys(merged).filter(key => merged[key])
  activateDeferredScripts(allowed)
}

  return (
    <CookieConsentContext.Provider
      value={{
        prefs,
        consentSet,
        savePrefs,
        showSettings,
        setShowSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => useContext(CookieConsentContext)
