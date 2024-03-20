import type { Session } from "@auth/core/types";
import { routeAction$, routeLoader$, zod$ } from "@builder.io/qwik-city";
import type { User } from "@prisma/client";
import { prisma } from "~/utils/prisma";
export type UserSuggestionType = User & {
  isFollowing: boolean;
  shouldFollowBack: boolean;
};
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

async function isFollowing(user1?: string, user2?: string) {
  const following = await prisma.follows.count({
    where: {
      followedById: user1,
      followingId: user2,
    },
  });

  return !!following;
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
  const results: UserSuggestionType[] = [];
  for await (const user of users) {
    const following = await isFollowing(session?.user.id, user.id);
    const shouldFollowBack = await isFollowing(user.id, session?.user.id);
    results.push({
      ...user,
      isFollowing: following,
      shouldFollowBack,
    });
  }
  return results;
});

// eslint-disable-next-line qwik/loader-location
export const useGetUser = routeLoader$(async ({ params, error, sharedMap }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    throw error(404, "User not found");
  }
  const session: Session | null = sharedMap.get("session");
  const following = await isFollowing(session?.user.id, user.id);
  const shouldFollowBack = await isFollowing(user.id, session?.user.id);
  return {
    ...user,
    isFollowing: following,
    shouldFollowBack,
  };
});

// eslint-disable-next-line qwik/loader-location
export const useUpdateUserProfile = routeAction$(
  async ({ id, ...data }, { redirect, url }) => {
    console.log(data.private);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        private: data.private === "on",
      },
    });

    throw redirect(302, url.href);
  },
  zod$((z) => ({
    id: z.string(),
    name: z.string(),
    bio: z.string(),
    link: z.string(),
    private: z.string(),
  })),
);
