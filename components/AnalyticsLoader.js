// components/AnalyticsLoader.js
import { gql, useQuery } from '@apollo/client'
import Script from 'next/script'

const GA_QUERY = gql`
  query GetGAId {
    phcGoogleAnalyticsId
  }
`

export default function AnalyticsLoader() {
  const { data, loading, error } = useQuery(GA_QUERY)

  const gaId = data?.phcGoogleAnalyticsId

  if (loading || error || !gaId) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  )
}
