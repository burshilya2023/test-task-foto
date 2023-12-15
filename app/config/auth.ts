import type {AuthOptions, User} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const users = [
    {
      id: "1",
      email: "bursh2023@gmail.com",
      name: "Бурш Илья",
      password: "qwerty",
      role: "admin",
    },
    {
      id: "2",
      email: "admin@gmail.com",
      name: "Super Admin",
      password: "12345",
      role: "admin",
    },
    {
      id: "3",
      email: "any@gmail.com",
      name: "Just a Guest",
      password: "12345",
      role: "guest",
    },
  ];

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const currentUser = users.find(user => user.email === credentials.email)
        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser;

          return userWithoutPass as User;
        }

        return null
      }
    })
  ]
  // pages: {
  //   signIn: '/signin'
  // }
}
