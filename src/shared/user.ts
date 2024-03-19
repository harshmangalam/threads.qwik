import type { Session } from "@auth/core/types";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { prisma } from "~/utils/prisma";

// eslint-disable-next-line qwik/loader-location
export const useFollowUser = routeAction$(
  async ({ userId }, { sharedMap, error, redirect, url }) => {
    // check for user session
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw error(401, "Unauthorized");
    }

    // follow user

    try {
      await prisma.follows.create({
        data: {
          followedById: session.user.id,
          followingId: userId,
        },
      });

      throw redirect(302, url.href);
    } catch (err) {
      console.log(err);
      throw error(500, "Internal server error");
    }
  },
  zod$((z) => ({
    userId: z.string(),
  })),
);
