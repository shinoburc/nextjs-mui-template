// reference: https://next-auth.js.org/getting-started/typescript
// To extend/augment this type, create a types/next-auth.d.ts file in your project:

import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      accessToken: string;
      refreshToken: string;
      accessTokenExpires: string;
    } & DefaultSession['user'];
  }
}
