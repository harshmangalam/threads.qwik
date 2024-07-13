import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { getPrisma } from "~/utils/prisma";

export async function saveThread(
  env: EnvGetter,
  threadId: string,
  userId: string,
) {
  const prisma = getPrisma(env);
  return prisma.savedThreads.create({
    data: {
      threadId,
      userId,
    },
  });
}

export async function unSaveThread(
  env: EnvGetter,
  threadId: string,
  userId: string,
) {
  const prisma = getPrisma(env);
  return prisma.savedThreads.delete({
    where: {
      userId_threadId: {
        threadId,
        userId,
      },
    },
  });
}

export async function isSavedThread(
  env: EnvGetter,
  threadId?: string,
  userId?: string,
) {
  const prisma = getPrisma(env);
  const saved = await prisma.savedThreads.count({
    where: {
      threadId,
      userId,
    },
  });
  return !!saved;
}

export async function likeThread(
  env: EnvGetter,
  threadId: string,
  userId: string,
) {
  const prisma = getPrisma(env);
  return prisma.likedThreads.create({
    data: {
      threadId,
      userId,
    },
  });
}

export async function unlikeThread(
  env: EnvGetter,
  threadId: string,
  userId: string,
) {
  const prisma = getPrisma(env);
  return prisma.likedThreads.delete({
    where: {
      userId_threadId: {
        threadId,
        userId,
      },
    },
  });
}

export async function isLikedThread(
  env: EnvGetter,
  threadId?: string,
  userId?: string,
) {
  const prisma = getPrisma(env);
  const count = await prisma.likedThreads.count({
    where: {
      threadId,
      userId,
    },
  });

  return Boolean(count);
}

export async function getThreadLikesCount(env: EnvGetter, threadId?: string) {
  const prisma = getPrisma(env);
  return prisma.likedThreads.count({
    where: {
      threadId,
    },
  });
}

export async function repostThread(
  env: EnvGetter,
  threadId: string,
  userId: string,
) {
  const prisma = getPrisma(env);
  return prisma.reposts.create({
    data: {
      threadId,
      userId,
    },
  });
}

export async function undoRepost(
  env: EnvGetter,
  threadId: string,
  userId: string,
) {
  const prisma = getPrisma(env);
  return prisma.reposts.delete({
    where: {
      userId_threadId: {
        threadId,
        userId,
      },
    },
  });
}

export async function getRepostsCount(env: EnvGetter, threadId?: string) {
  const prisma = getPrisma(env);
  return prisma.reposts.count({
    where: {
      threadId,
    },
  });
}
export async function hasRepostedThread(
  env: EnvGetter,
  threadId?: string,
  userId?: string,
) {
  const prisma = getPrisma(env);
  const reposted = await prisma.reposts.count({
    where: {
      threadId,
      userId,
    },
  });
  return !!reposted;
}

export async function getRepliesCount(env: EnvGetter, threadId?: string) {
  const prisma = getPrisma(env);
  return prisma.thread.count({
    where: {
      parentThreadId: threadId,
      isReply: true,
    },
  });
}
