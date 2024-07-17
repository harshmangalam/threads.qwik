import type { Session } from "@auth/core/types";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { followUser, unfollowUser } from "./common";
import { getPrisma } from "~/utils/prisma";

// eslint-disable-next-line qwik/loader-location
export const useFollowUser = routeAction$(
  async ({ userId }, { sharedMap, error, redirect, url, env }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw error(401, "Unauthorized");
    }
    try {
      await followUser(env, session.user.id, userId);
      throw redirect(301, url.pathname + url.search);
    } catch (err: any) {
      if (err.code === "P2002") {
        try {
          await unfollowUser(env, session.user.id, userId);
          throw redirect(301, url.pathname + url.search);
        } catch (err: any) {
          if (err.message) {
            console.log("Error while unfollow user", err.message);
            throw error(500, "Internal server error");
          }
          throw err;
        }
      }
      if (err.message) {
        console.log("Error while follow user", err.message);
        throw error(500, "Internal server error");
      }
      throw err;
    }
  },
  zod$((z) => ({
    userId: z.string(),
  })),
);

// eslint-disable-next-line qwik/loader-location
export const useUpdateUserProfile = routeAction$(
  async ({ id, ...data }, { redirect, url, env }) => {
    const prisma = getPrisma(env);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        private: data.private === "on",
      },
    });

    throw redirect(302, url.pathname);
  },
  zod$((z) => ({
    id: z.string(),
    name: z.string(),
    bio: z.string(),
    link: z.string(),
    private: z.string(),
  })),
);
