import type { Session } from "@auth/core/types";
import { routeAction$, routeLoader$, zod$ } from "@builder.io/qwik-city";
import type { Thread, User } from "@prisma/client";
import { prisma } from "~/utils/prisma";

export type ThreadType = Thread & {
  isSaved: boolean;
  isLiked: boolean;
  likesCount: number;
  user: Pick<User, "id" | "username" | "image">;
};
async function saveThread(threadId: string, userId: string) {
  return prisma.savedThreads.create({
    data: {
      threadId,
      userId,
    },
  });
}

async function unSaveThread(threadId: string, userId: string) {
  return prisma.savedThreads.delete({
    where: {
      userId_threadId: {
        threadId,
        userId,
      },
    },
  });
}

async function isSavedThread(threadId?: string, userId?: string) {
  const saved = await prisma.savedThreads.count({
    where: {
      threadId,
      userId,
    },
  });
  return !!saved;
}

async function likeThread(threadId: string, userId: string) {
  return prisma.likedThreads.create({
    data: {
      threadId,
      userId,
    },
  });
}

async function unlikeThread(threadId: string, userId: string) {
  return prisma.likedThreads.delete({
    where: {
      userId_threadId: {
        threadId,
        userId,
      },
    },
  });
}

async function isLikedThread(threadId: string, userId?: string) {
  const count = await prisma.likedThreads.count({
    where: {
      threadId,
      userId,
    },
  });

  return Boolean(count);
}

async function getThreadLikesCount(threadId: string) {
  return prisma.likedThreads.count({
    where: {
      threadId,
    },
  });
}
// eslint-disable-next-line qwik/loader-location
export const useCreateThread = routeAction$(
  async (form, { sharedMap, redirect, url }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, `/login`);
    }
    await prisma.thread.create({
      data: {
        ...form,
        userId: session.user.id,
      },
    });

    throw redirect(302, url.href);
  },
  zod$((z) => ({
    text: z.string(),
    replyPrivacy: z.enum(["ANYONE", "FOLLOWING", "MENTION"]),
  })),
);

// eslint-disable-next-line qwik/loader-location
export const useDeleteThread = routeAction$(
  async ({ threadId }, { redirect, url }) => {
    console.log(url.href);
    await prisma.thread.delete({
      where: {
        id: threadId,
      },
    });

    throw redirect(302, url.href);
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
    const isLiked = await isLikedThread(thread.id, session?.user.id);
    const likesCount = await getThreadLikesCount(thread.id);

    results.push({
      ...thread,
      isSaved,
      isLiked,
      likesCount,
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
      const isLiked = await isLikedThread(thread.id, session?.user.id);
      const likesCount = await getThreadLikesCount(thread.id);

      results.push({
        ...thread,
        isSaved: isSaved,
        isLiked,
        likesCount,
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
    const isLiked = await isLikedThread(data.threadId, session?.user.id);
    const likesCount = await getThreadLikesCount(data.threadId);

    results.push({ ...data.thread, isSaved: true, isLiked, likesCount });
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
