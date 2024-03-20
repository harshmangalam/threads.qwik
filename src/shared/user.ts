import type { Session } from "@auth/core/types";
import { routeAction$, routeLoader$, zod$ } from "@builder.io/qwik-city";
import { prisma } from "~/utils/prisma";

async function followUser(followedById: string, followingId: string) {
  return prisma.follows.create({
    data: {
      followedById,
      followingId,
    },
  });
}

async function unfollowUser(followedById: string, followingId: string) {
  await prisma.follows.delete({
    where: {
      followedById_followingId: {
        followedById,
        followingId,
      },
    },
  });
}

// eslint-disable-next-line qwik/loader-location
export const useFollowUser = routeAction$(
  async ({ userId }, { sharedMap, error, redirect, url }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw error(401, "Unauthorized");
    }
    try {
      await followUser(session.user.id, userId);
      throw redirect(301, url.href);
    } catch (err: any) {
      if (err.code === "P2002") {
        try {
          await unfollowUser(session.user.id, userId);
          throw redirect(301, url.href);
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
export const useGetUsers = routeLoader$(async ({ sharedMap }) => {
  const session: Session | null = sharedMap.get("session");

  const users = await prisma.user.findMany();
  const results = [];
  for await (const user of users) {
    const following = await prisma.follows.count({
      where: {
        followedById: session?.user.id,
        followingId: user.id,
      },
    });
    const followBack = await prisma.follows.count({
      where: {
        followedById: user.id,
        followingId: session?.user.id,
      },
    });

    results.push({
      ...user,
      following,
      followBack,
    });
  }
  return users;
});
