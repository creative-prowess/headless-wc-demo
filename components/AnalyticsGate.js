// components/AnalyticsGate.js
import { useCookieConsent } from '@/context/CookieConsentContext'
import AnalyticsLoader from './AnalyticsLoader'

export default function AnalyticsGate() {
  const { prefs } = useCookieConsent()
  return prefs.analytics ? <AnalyticsLoader /> : null
}
