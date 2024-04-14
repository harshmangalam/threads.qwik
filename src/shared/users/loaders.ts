import type { Session } from "@auth/core/types";
import { routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "~/utils/prisma";
import type { UserSearchType, UserSuggestionType } from "./types";
import { followersCount, isFollowing } from "./common";

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
export const useGetFollowersCount = routeLoader$(async ({ params }) => {
  const count = await followersCount(params.username);
  return count;
});

// eslint-disable-next-line qwik/loader-location
export const useSearchUsers = routeLoader$(
  async ({ query, error, sharedMap }) => {
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
        const following = await isFollowing(session?.user.id, user.id);
        const shouldFollowBack = await isFollowing(user.id, session?.user.id);
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
