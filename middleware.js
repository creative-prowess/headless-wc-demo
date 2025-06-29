// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
  const auth = request.headers.get('authorization')
  const USER = process.env.BASIC_AUTH_USER || 'dev'
  const PASS = process.env.BASIC_AUTH_PASS || 'notlive'

  if (auth) {
    const [, encoded] = auth.split(' ')
    const decoded = atob(encoded)
    const [user, pass] = decoded.split(':')

    if (user === USER && pass === PASS) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected"',
    },
  })
}
export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|api).*)'],
}
