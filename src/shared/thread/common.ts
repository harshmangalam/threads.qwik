import { prisma } from "~/utils/prisma";

export async function saveThread(threadId: string, userId: string) {
  return prisma.savedThreads.create({
    data: {
      threadId,
      userId,
    },
  });
}

export async function unSaveThread(threadId: string, userId: string) {
  return prisma.savedThreads.delete({
    where: {
      userId_threadId: {
        threadId,
        userId,
      },
    },
  });
}

export async function isSavedThread(threadId?: string, userId?: string) {
  const saved = await prisma.savedThreads.count({
    where: {
      threadId,
      userId,
    },
  });
  return !!saved;
}

export async function likeThread(threadId: string, userId: string) {
  return prisma.likedThreads.create({
    data: {
      threadId,
      userId,
    },
  });
}

export async function unlikeThread(threadId: string, userId: string) {
  return prisma.likedThreads.delete({
    where: {
      userId_threadId: {
        threadId,
        userId,
      },
    },
  });
}

export async function isLikedThread(threadId?: string, userId?: string) {
  const count = await prisma.likedThreads.count({
    where: {
      threadId,
      userId,
    },
  });

  return Boolean(count);
}

export async function getThreadLikesCount(threadId?: string) {
  return prisma.likedThreads.count({
    where: {
      threadId,
    },
  });
}

export async function repostThread(threadId: string, userId: string) {
  return prisma.reposts.create({
    data: {
      threadId,
      userId,
    },
  });
}

export async function undoRepost(threadId: string, userId: string) {
  return prisma.reposts.delete({
    where: {
      userId_threadId: {
        threadId,
        userId,
      },
    },
  });
}

export async function getRepostsCount(threadId?: string) {
  return prisma.reposts.count({
    where: {
      threadId,
    },
  });
}
export async function hasRepostedThread(threadId?: string, userId?: string) {
  const reposted = await prisma.reposts.count({
    where: {
      threadId,
      userId,
    },
  });
  return !!reposted;
}

export async function getRepliesCount(threadId?: string) {
  return prisma.thread.count({
    where: {
      parentThreadId: threadId,
      isReply: true,
    },
  });
}
