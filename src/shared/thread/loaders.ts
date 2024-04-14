import { routeLoader$ } from "@builder.io/qwik-city";
import type { Session } from "@auth/core/types";

import {
  getRepliesCount,
  getRepostsCount,
  getThreadLikesCount,
  hasRepostedThread,
  isLikedThread,
  isSavedThread,
} from "./common";
import { prisma } from "~/utils/prisma";
import type { ThreadType } from "./types";

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
      const saved = await isSavedThread(thread.id, session?.user.id);
      const liked = await isLikedThread(thread.id, session?.user.id);
      const likesCount = await getThreadLikesCount(thread.id);
      const reposted = await hasRepostedThread(thread.id, session?.user.id);
      const repostsCount = await getRepostsCount(thread.id);
      results.push({
        ...thread,
        saved,
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

// eslint-disable-next-line qwik/loader-location
export const useGetLikedThreads = routeLoader$(async ({ sharedMap }) => {
  const session: Session | null = sharedMap.get("session");
  const savedThreads = await prisma.likedThreads.findMany({
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
export const useGetThreadReplies = routeLoader$(
  async ({ sharedMap, params }) => {
    const session: Session | null = sharedMap.get("session");
    const threadId = params.threadId;

    const replies = await prisma.thread.findMany({
      where: {
        isReply: true,
        parentThreadId: threadId,
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
    const data: ThreadType[] = [];

    for await (const thread of replies) {
      const saved = await isSavedThread(thread.id, session?.user.id);
      const liked = await isLikedThread(thread.id, session?.user.id);
      const likesCount = await getThreadLikesCount(thread.id);
      const reposted = await hasRepostedThread(thread.id, session?.user.id);
      const repostsCount = await getRepostsCount(thread.id);
      const repliesCount = await getRepliesCount(thread.id);

      data.push({
        ...thread,
        saved,
        liked,
        likesCount,
        reposted,
        repostsCount,
        repliesCount,
      });
    }

    return data;
  },
);

// eslint-disable-next-line qwik/loader-location
export const useGetThread = routeLoader$(
  async ({ params, sharedMap, error }) => {
    const session: Session | null = sharedMap.get("session");
    const threadId = params.threadId;
    const saved = await isSavedThread(threadId, session?.user.id);
    const liked = await isLikedThread(threadId, session?.user.id);
    const likesCount = await getThreadLikesCount(threadId);
    const reposted = await hasRepostedThread(threadId, session?.user.id);
    const repostsCount = await getRepostsCount(threadId);
    const repliesCount = await getRepliesCount(threadId);

    const thread = await prisma.thread.findUnique({
      where: {
        id: threadId,
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

    if (!thread) {
      throw error(404, "Thread not found");
    }

    const data = {
      ...thread,
      saved,
      liked,
      likesCount,
      reposted,
      repostsCount,
      repliesCount,
    } satisfies ThreadType;

    return data;
  },
);
