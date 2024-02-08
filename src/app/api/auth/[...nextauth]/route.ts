import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (credentials?.username === process.env.ONLY_USERNAME && credentials?.password === process.env.ONLY_PASSWORD) {
          return { name: 'Upsided', id: 'upsided' }
        }
        return null
      },
    })
  ],
})

export { handler as GET, handler as POST }