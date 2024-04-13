import type { Session } from "@auth/core/types";
import {
  routeAction$,
  routeLoader$,
  server$,
  zod$,
} from "@builder.io/qwik-city";
import type { Thread, User } from "@prisma/client";
import { prisma } from "~/utils/prisma";

export type ThreadType = Thread & {
  saved: boolean;
  liked: boolean;
  reposted: boolean;
  likesCount: number;
  repostsCount: number;
  repliesCount?: number;
  user: Pick<User, "id" | "username" | "image">;
  parentThread?: any;
};
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

// eslint-disable-next-line qwik/loader-location
export const useCreateThread = routeAction$(
  async (
    { replyPrivacy, text, threadId },
    { sharedMap, redirect, url, error },
  ) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, `/login`);
    }
    try {
      const replyThread = await prisma.thread.create({
        data: {
          replyPrivacy,
          text,
          userId: session.user.id,
          isReply: !!threadId,
          parentThreadId: threadId,
        },
      });

      if (threadId) {
        await prisma.thread.update({
          where: {
            id: threadId,
          },
          data: {
            replies: {
              connect: {
                id: replyThread.id,
              },
            },
          },
        });
      }

      throw redirect(302, url.pathname);
    } catch (err: any) {
      if (err.message) {
        console.log("Error create thread reply", err.message);
        throw error(500, "Internal server error");
      }
      throw err;
    }
  },
  zod$((z) => ({
    text: z.string(),
    replyPrivacy: z.enum(["ANYONE", "FOLLOWING", "MENTION"]),
    threadId: z.string().optional(),
  })),
);

// eslint-disable-next-line qwik/loader-location
export const useDeleteThread = routeAction$(
  async ({ threadId }, { redirect, url, error }) => {
    try {
      await prisma.likedThreads.deleteMany({
        where: {
          threadId,
        },
      });
      await prisma.thread.delete({
        where: {
          id: threadId,
        },
      });

      throw redirect(302, url.pathname);
    } catch (err: any) {
      if (err.message) {
        throw error(500, "Internal server error");
      }
      throw err;
    }
  },
  zod$((z) => ({
    threadId: z.string(),
  })),
);

// eslint-disable-next-line qwik/loader-location
export const useUpdateReplyPrivacy = routeAction$(
  async ({ threadId, replyPrivacy }) => {
    await prisma.thread.update({
      where: {
        id: threadId,
      },
      data: {
        replyPrivacy,
      },
    });
  },
  zod$((z) => ({
    threadId: z.string(),
    replyPrivacy: z.enum(["ANYONE", "FOLLOWING", "MENTION"]),
  })),
);

// eslint-disable-next-line qwik/loader-location
export const useGetThreads = routeLoader$(async ({ sharedMap }) => {
  const session: Session | null = sharedMap.get("session");
  const threads = await prisma.thread.findMany({
    where: {
      isReply: false,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
    },
  });
  const results = [];
  for await (const thread of threads) {
    const saved = await isSavedThread(thread.id, session?.user.id);
    const liked = await isLikedThread(thread.id, session?.user.id);
    const reposted = await hasRepostedThread(thread.id, session?.user.id);
    const repostsCount = await getRepostsCount(thread.id);
    const likesCount = await getThreadLikesCount(thread.id);
    const repliesCount = await getRepliesCount(thread.id);

    results.push({
      ...thread,
      saved,
      liked,
      likesCount,
      reposted,
      repostsCount,
      repliesCount,
    });
  }
  return results;
});

// eslint-disable-next-line qwik/loader-location
export const useSaveThread = routeAction$(
  async ({ threadId }, { redirect, sharedMap, error, url }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, "/login/");
    }
    try {
      await saveThread(threadId, session.user.id);
      throw redirect(302, url.href);
    } catch (err: any) {
      if (err.code === "P2002") {
        try {
          await unSaveThread(threadId, session.user.id);
          throw redirect(302, url.href);
        } catch (err: any) {
          if (err.message) {
            console.log("Error while unsave thread", err.message);
            throw error(500, err.message);
          }
          throw err;
        }
      }
      if (err.message) {
        console.log("Error while save thread", err.message);
        throw error(500, err.message);
      }
      throw err;
    }
  },
  zod$((z) => ({
    threadId: z.string(),
  })),
);

// eslint-disable-next-line qwik/loader-location
export const useGetProfileThreds = routeLoader$(
  async ({ params, sharedMap }) => {
    const session: Session | null = sharedMap.get("session");
    const threads = await prisma.thread.findMany({
      where: {
        user: {
          username: params.username,
        },
        isReply: false,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });
    const results = [];
    for await (const thread of threads) {
      const isSaved = await isSavedThread(thread.id, session?.user.id);
      const liked = await isLikedThread(thread.id, session?.user.id);
      const likesCount = await getThreadLikesCount(thread.id);
      const reposted = await hasRepostedThread(thread.id, session?.user.id);
      const repostsCount = await getRepostsCount(thread.id);
      const repliesCount = await getRepliesCount(thread.id);

      results.push({
        ...thread,
        isSaved: isSaved,
        liked,
        likesCount,
        reposted,
        repostsCount,
        repliesCount,
      });
    }
    return results;
  },
);

// eslint-disable-next-line qwik/loader-location
export const useGetSavedThreads = routeLoader$(async ({ sharedMap }) => {
  const session: Session | null = sharedMap.get("session");
  const savedThreads = await prisma.savedThreads.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      thread: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
      },
    },
  });
  const results: ThreadType[] = [];
  for await (const data of savedThreads) {
    const liked = await isLikedThread(data.threadId, session?.user.id);
    const likesCount = await getThreadLikesCount(data.threadId);
    const reposted = await hasRepostedThread(data.thread.id, session?.user.id);
    const repostsCount = await getRepostsCount(data.thread.id);
    const repliesCount = await getRepliesCount(data.thread.id);

    results.push({
      ...data.thread,
      saved: true,
      liked,
      likesCount,
      reposted,
      repostsCount,
      repliesCount,
    });
  }
  return results;
});

// eslint-disable-next-line qwik/loader-location
export const useLikeThread = routeAction$(
  async ({ threadId }, { sharedMap, redirect, url, error }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, "/login");
    }

    try {
      await likeThread(threadId, session.user.id);
      throw redirect(301, url.pathname);
    } catch (err: any) {
      if (err.code === "P2002") {
        try {
          await unlikeThread(threadId, session.user.id);
          throw redirect(301, url.pathname);
        } catch (err: any) {
          if (err.message) {
            console.log("Error thread unlike", err.message);
            throw error(500, "Internal server error");
          }
          throw err;
        }
      }
      if (err.message) {
        console.log("Error thread like", err.message);
        throw error(500, "Internal server error");
      }
      throw err;
    }
  },
  zod$((z) => ({
    threadId: z.string(),
  })),
);

// eslint-disable-next-line qwik/loader-location
export const useRepostThreads = routeAction$(
  async ({ threadId }, { error, redirect, sharedMap, url }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, "/login");
    }
    try {
      await repostThread(threadId, session.user.id);
      throw redirect(301, url.pathname);
    } catch (err: any) {
      if (err.code === "P2002") {
        try {
          await undoRepost(threadId, session.user.id);
          throw redirect(301, url.pathname);
        } catch (err: any) {
          if (err.message) {
            console.log("Error undo thread repost", err.message);
            throw error(500, "Internal server error");
          }
          throw err;
        }
      }
      if (err.message) {
        console.log("Error thread repost", err.message);
        throw error(500, "Internal server error");
      }
      throw err;
    }
  },
  zod$((z) => ({
    threadId: z.string(),
  })),
);

export const getThreadsLikes = server$(async (threadId: string) => {
  const likes = await prisma.likedThreads.findMany({
    where: {
      threadId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          name: true,
        },
      },
    },
  });

  return likes;
});

export const getThreadsReposts = server$(async (threadId: string) => {
  const reposts = await prisma.reposts.findMany({
    where: {
      threadId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          name: true,
        },
      },
    },
  });

  return reposts;
});

// eslint-disable-next-line qwik/loader-location
export const useGetRepostedThreads = routeLoader$(
  async ({ params, sharedMap }) => {
    const session: Session | null = sharedMap.get("session");
    const reposts = await prisma.reposts.findMany({
      where: {
        user: {
          username: params.username,
        },
      },
      include: {
        thread: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
          },
        },
      },
    });
    const results = [];
    for await (const repost of reposts) {
      const thread = repost.thread;
      const isSaved = await isSavedThread(thread.id, session?.user.id);
      const liked = await isLikedThread(thread.id, session?.user.id);
      const likesCount = await getThreadLikesCount(thread.id);
      const reposted = await hasRepostedThread(thread.id, session?.user.id);
      const repostsCount = await getRepostsCount(thread.id);
      results.push({
        ...thread,
        isSaved: isSaved,
        liked,
        likesCount,
        reposted,
        repostsCount,
      });
    }
    return results;
  },
);

// eslint-disable-next-line qwik/loader-location
export const useGetProfileReplies = routeLoader$(
  async ({ params, sharedMap }) => {
    const session: Session | null = sharedMap.get("session");
    const threads = await prisma.thread.findMany({
      where: {
        user: {
          username: params.username,
        },
        isReply: true,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        parentThread: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
          },
        },
      },
    });
    const results: ThreadType[] = [];
    for await (const thread of threads) {
      const saved = await isSavedThread(thread.id, session?.user.id);
      const liked = await isLikedThread(thread.id, session?.user.id);
      const likesCount = await getThreadLikesCount(thread.id);
      const reposted = await hasRepostedThread(thread.id, session?.user.id);
      const repostsCount = await getRepostsCount(thread.id);
      const repliesCount = await getRepliesCount(thread.id);

      results.push({
        ...thread,
        saved,
        liked,
        likesCount,
        reposted,
        repostsCount,
        repliesCount,
        parentThread: thread.parentThreadId
          ? {
              ...thread.parentThread,
              saved: await isSavedThread(
                thread.parentThreadId,
                session?.user.id,
              ),
              liked: await isLikedThread(
                thread.parentThreadId,
                session?.user.id,
              ),
              likesCount: await getThreadLikesCount(thread.parentThreadId),
              reposted: await hasRepostedThread(
                thread.parentThreadId,
                session?.user.id,
              ),
              repostsCount: await getRepostsCount(thread.parentThreadId),
              repliesCount: await getRepliesCount(thread.parentThreadId),
            }
          : undefined,
      });
    }
    return results;
  },
);
