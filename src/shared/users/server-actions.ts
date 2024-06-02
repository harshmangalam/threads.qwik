import { server$ } from "@builder.io/qwik-city";
import { prisma } from "~/utils/prisma";
import { type UserListType } from "./types";
import { isFollowing } from "./common";
export const getFollowers = server$(async (userId: string) => {
  const follows = await prisma.follows.findMany({
    where: {
      followingId: userId,
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

  const results: UserListType[] = [];
  for await (const follow of follows) {
    const following = await isFollowing(follow.followedBy.id, userId);
    results.push({
      ...follow.followedBy,
      isFollowing: following,
      shouldFollowBack: false,
    });
  }

  return results;
});

export const getFollowings = server$(async (userId: string) => {
  const follows = await prisma.follows.findMany({
    where: {
      followedById: userId,
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
    const following = await isFollowing(userId, follow.following.id);
    results.push({
      ...follow.following,
      isFollowing: following,
      shouldFollowBack: false,
    });
  }

  return results;
});
