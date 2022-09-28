import NextAuth, { Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { fauna } from '../../../services/fauna';
import { query as q } from 'faunadb';

interface SessionProps extends Session {
   activeSubscription: {} | null;
}

export default NextAuth({
   secret: process.env.SECRET,
   // Configure one or more authentication providers
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
         authorization: {
            params: {
               scope: 'read:user',
            },
         },
      }),
   ],
   callbacks: {
      async signIn(user): Promise<boolean> {
         try {
            await fauna.query(
               q.If(
                  q.Not(q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(user.user.email)))),
                  q.Create(q.Collection('users'), {
                     data: { email: user.user.email },
                  }),
                  q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.user.email))),
               ),
            );
            return true;
         } catch (error) {
            return false;
         }
      },
      async session({session}): Promise<SessionProps> {
         try {
            const userActiveSubscription = await fauna.query(
               q.Get(
                  q.Intersection([
                     q.Match(
                        q.Index('subscription_by_user_ref'),
                        q.Select('ref', q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))),
                     ),
                     q.Match(
                        q.Index('subscription_by_status'),
                        "active"
                     )
                  ])

               ),
            );
            return { ...session, activeSubscription: userActiveSubscription }
         } catch {
            return { ...session, activeSubscription: null }
         }
      },
   },
});
