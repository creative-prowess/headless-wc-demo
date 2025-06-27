import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // Add role only once on initial sign-in
      if (user?.email && !token.role) {
        token.role = user.email === 'support@prowess.io' ? 'administrator' : 'user';
      }

      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role || 'user';
      return session;
    },
  },
})
