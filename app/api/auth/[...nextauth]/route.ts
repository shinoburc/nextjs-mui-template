//const ldap = require("ldapjs");
import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
//import GithubProvider from "next-auth/providers/github";
//import { PrismaAdapter } from "@next-auth/prisma-adapter";

//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();
import { prisma } from '@/app/_utils/prismaSingleton';

const handler = NextAuth({
  // CredentialsProviderの場合 adapter は使用できない模様。
  //adapter: PrismaAdapter(prisma),
  theme: {
    colorScheme: 'light',
  },
  providers: [
    /*
      GithubProvider({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
      */
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'User email',
          type: 'text',
          placeholder: 'User email',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    /*
      // LDAP Credentials
      CredentialsProvider({
        id: "ldap",
        name: "LDAP",
        credentials: {
          name: { label: "LDAP User", type: "text", placeholder: "" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          console.log(credentials);
          // You might want to pull this call out so we're not making a new LDAP client on every login attemp
          const client = ldap.createClient({
            url: "ldap://ldap.es.occ.co.jp:389",
          });
  
          // Essentially promisify the LDAPJS client.bind function
          return new Promise((resolve, reject) => {
            client.bind(
              `uid=${credentials?.name},ou=Users,dc=occ,dc=co,dc=jp`,
              credentials?.password,
              (error: any) => {
                if (error) {
                  console.error("Failed");
                  reject();
                } else {
                  console.log("Logged in");
                  // Add user if user is not exist in DB.
                  resolve({
                    email: credentials?.name + "@occ.co.jp",
                    name: credentials?.name,
                  });
                }
              }
            );
          });
        },
      }),
      */
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("token: ", token)
      // セッションの有効秒
      const SESSION_EXPIRES_SECOND = 60 * 60;
      // 秒までの現在時刻を UNIXTIME で取得する
      const nowUnixtime = Math.floor(Date.now() / 1000);

      // 最初のサインイン
      if (account && user) {
        // 現在時刻+セッション有効秒を計算し、セッション期限を生成する
        const sessionExpires = nowUnixtime + SESSION_EXPIRES_SECOND;
        // JWT に独自のフィールドを追加するため、型を拡張しておく
        // reference: https://next-auth.js.org/getting-started/typescript#submodules
        // reference: https://techlab.q-co.jp/articles/111/
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.accessTokenExpires,
          sessionExpires: sessionExpires,
        };
      }

      if(token.sessionExpires > nowUnixtime){
        // セッション有効期限を更新する
        token.sessionExpires = nowUnixtime + SESSION_EXPIRES_SECOND;
      } else {
        // セッション切れのため、Promise.rejectを return する
        return Promise.reject({
          error: new Error("token has expired. Please log in again."),
        });
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    //maxAge: 10,
  },
  secret: process.env.NEXTAUTH_SECRET,
  // サインイン・サインアウトで飛ぶカスタムログインページを指定
  /*
    pages: {
      signIn: "/login",
      signOut: "/login",
    },
    */
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
