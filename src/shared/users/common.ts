import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { getPrisma } from "~/utils/prisma";

export async function followUser(
  env: EnvGetter,
  followedById: string,
  followingId: string,
) {
  const prisma = getPrisma(env);
  return prisma.follows.create({
    data: {
      followedById,
      followingId,
    },
  });
}
export async function unfollowUser(
  env: EnvGetter,
  followedById: string,
  followingId: string,
) {
  const prisma = getPrisma(env);

  await prisma.follows.delete({
    where: {
      followedById_followingId: {
        followedById,
        followingId,
      },
    },
  });
}
export async function isFollowing(
  env: EnvGetter,
  user1?: string,
  user2?: string,
) {
  const prisma = getPrisma(env);

  const following = await prisma.follows.count({
    where: {
      followedById: user1,
      followingId: user2,
    },
  });

  return !!following;
}
export async function followersCount(env: EnvGetter, username: string) {
  const prisma = getPrisma(env);

  return prisma.follows.count({
    where: {
      following: {
        username,
      },
    },
  });
}
