import { serverAuth$ } from "@builder.io/qwik-auth";
import GitHub from "@auth/core/providers/github";
import type { Provider } from "@auth/core/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import { getPrisma } from "~/utils/prisma";

declare module "@auth/core/types" {
  interface Session {
    user: User & { username: string };
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser extends User {}
}

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  // @ts-ignore
  serverAuth$(({ env }) => {
    const prisma = getPrisma(env);
    return {
      adapter: PrismaAdapter(prisma),
      secret: env.get("AUTH_SECRET"),
      trustHost: true,
      providers: [
        GitHub({
          clientId: env.get("GITHUB_ID")!,
          clientSecret: env.get("GITHUB_SECRET")!,
          profile: (p) => ({
            id: p.id.toString(),
            username: p.login,
            email: p.email,
            image: p.avatar_url,
            name: p.name,
          }),
        }),
      ] as Provider[],

      callbacks: {
        session: async (opts: any) => {
          const { session, user } = opts;
          return {
            ...session,
            user: {
              ...user,
            },
          };
        },
      },
    };
  });
