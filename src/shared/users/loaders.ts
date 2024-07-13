import type { Session } from "@auth/core/types";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getPrisma } from "~/utils/prisma";
import type { UserListType, UserSearchType, UserSuggestionType } from "./types";
import { followersCount, isFollowing } from "./common";

// eslint-disable-next-line qwik/loader-location
export const useGetUsers = routeLoader$(async ({ sharedMap, env }) => {
  const session: Session | null = sharedMap.get("session");
  const prisma = getPrisma(env);
  const users = await prisma.user.findMany();
  const results: UserSuggestionType[] = [];
  for await (const user of users) {
    const following = await isFollowing(env, session?.user.id, user.id);
    const shouldFollowBack = await isFollowing(env, user.id, session?.user.id);
    results.push({
      ...user,
      isFollowing: following,
      shouldFollowBack,
    });
  }
  return results;
});

// eslint-disable-next-line qwik/loader-location
export const useGetUser = routeLoader$(
  async ({ params, error, sharedMap, env }) => {
    const prisma = getPrisma(env);
    const user = await prisma.user.findUnique({
      where: {
        username: params.username,
      },
    });

    if (!user) {
      throw error(404, "User not found");
    }
    const session: Session | null = sharedMap.get("session");
    const following = await isFollowing(env, session?.user.id, user.id);
    const shouldFollowBack = await isFollowing(env, user.id, session?.user.id);
    return {
      ...user,
      isFollowing: following,
      shouldFollowBack,
    };
  },
);

// eslint-disable-next-line qwik/loader-location
export const useGetFollowersCount = routeLoader$(async ({ params, env }) => {
  const count = await followersCount(env, params.username);
  return count;
});

// eslint-disable-next-line qwik/loader-location
export const useSearchUsers = routeLoader$(
  async ({ query, error, sharedMap, env }) => {
    const prisma = getPrisma(env);
    const session: Session | null = sharedMap.get("session");
    const search = query.get("q");
    if (!search) {
      return [];
    }
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: search } },
            { username: { contains: search } },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          _count: {
            select: {
              followedBy: true,
            },
          },
        },
      });
      const results: UserSearchType[] = [];
      for await (const user of users) {
        const following = await isFollowing(env, session?.user.id, user.id);
        const shouldFollowBack = await isFollowing(
          env,
          user.id,
          session?.user.id,
        );
        results.push({
          ...user,
          followersCount: user._count.followedBy,
          isFollowing: following,
          shouldFollowBack,
        });
      }
      return results;
    } catch (err) {
      console.log(err);
      throw error(500, "Internal server error");
    }
  },
);

// eslint-disable-next-line qwik/loader-location
export const useGetFollowers = routeLoader$(async ({ params, error, env }) => {
  const prisma = getPrisma(env);
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });
  if (!user) throw error(404, "User not found");
  const follows = await prisma.follows.findMany({
    where: {
      followingId: user.id,
    },
    include: {
      followedBy: {
        select: {
          id: true,
          username: true,
          image: true,
          name: true,
        },
      },
    },
  });

  // eslint-disable-next-line qwik/loader-location
  const results: UserListType[] = [];
  for await (const follow of follows) {
    const following = await isFollowing(env, user.id, follow.followedBy.id);
    results.push({
      ...follow.followedBy,
      isFollowing: following,
      shouldFollowBack: !following,
    });
  }

  return results;
});

// eslint-disable-next-line qwik/loader-location
export const useGetFollowings = routeLoader$(async ({ env, params, error }) => {
  const prisma = getPrisma(env);
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });
  if (!user) throw error(404, "User not found");
  const follows = await prisma.follows.findMany({
    where: {
      followedById: user.id,
    },
    include: {
      following: {
        select: {
          id: true,
          username: true,
          image: true,
          name: true,
        },
      },
    },
  });

  const results: UserListType[] = [];
  for await (const follow of follows) {
    const following = await isFollowing(env, user.id, follow.following.id);
    results.push({
      ...follow.following,
      isFollowing: following,
      shouldFollowBack: !following,
    });
  }

  return results;
});
