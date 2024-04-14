import { prisma } from "~/utils/prisma";

export async function followUser(followedById: string, followingId: string) {
  return prisma.follows.create({
    data: {
      followedById,
      followingId,
    },
  });
}
export async function unfollowUser(followedById: string, followingId: string) {
  await prisma.follows.delete({
    where: {
      followedById_followingId: {
        followedById,
        followingId,
      },
    },
  });
}
export async function isFollowing(user1?: string, user2?: string) {
  const following = await prisma.follows.count({
    where: {
      followedById: user1,
      followingId: user2,
    },
  });

  return !!following;
}
export async function followersCount(username: string) {
  return prisma.follows.count({
    where: {
      following: {
        username,
      },
    },
  });
}
