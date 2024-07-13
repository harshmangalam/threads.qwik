import type { Session } from "@auth/core/types";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { getPrisma } from "~/utils/prisma";
import {
  likeThread,
  repostThread,
  saveThread,
  unSaveThread,
  undoRepost,
  unlikeThread,
} from "./common";

// eslint-disable-next-line qwik/loader-location
export const useCreateThread = routeAction$(
  async (
    { replyPrivacy, text, threadId },
    { sharedMap, redirect, url, error, env },
  ) => {
    const prisma = getPrisma(env);
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
  async ({ threadId }, { redirect, url, error, env }) => {
    const prisma = getPrisma(env);
    try {
      // delete all likes from thread
      await prisma.likedThreads.deleteMany({
        where: {
          threadId,
        },
      });

      // delete all reposts of the thread
      await prisma.reposts.deleteMany({
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
        console.log("Delete thread error ", err.message);
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
  async ({ threadId, replyPrivacy }, { redirect, url, env }) => {
    const prisma = getPrisma(env);
    await prisma.thread.update({
      where: {
        id: threadId,
      },
      data: {
        replyPrivacy,
      },
    });
    throw redirect(302, url.pathname);
  },
  zod$((z) => ({
    threadId: z.string(),
    replyPrivacy: z.enum(["ANYONE", "FOLLOWING", "MENTION"]),
  })),
);

// eslint-disable-next-line qwik/loader-location
export const useSaveThread = routeAction$(
  async ({ threadId }, { redirect, sharedMap, error, url, env }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, "/login/");
    }
    try {
      await saveThread(env, threadId, session.user.id);
      throw redirect(302, url.pathname);
    } catch (err: any) {
      if (err.code === "P2002") {
        try {
          await unSaveThread(env, threadId, session.user.id);
          throw redirect(302, url.pathname);
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
export const useLikeThread = routeAction$(
  async ({ threadId }, { sharedMap, redirect, url, error, env }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, "/login");
    }

    try {
      await likeThread(env, threadId, session.user.id);
      throw redirect(301, url.pathname);
    } catch (err: any) {
      if (err.code === "P2002") {
        try {
          await unlikeThread(env, threadId, session.user.id);
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
  async ({ threadId }, { error, redirect, sharedMap, url, env }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, "/login");
    }
    try {
      await repostThread(env, threadId, session.user.id);
      throw redirect(301, url.pathname);
    } catch (err: any) {
      if (err.code === "P2002") {
        try {
          await undoRepost(env, threadId, session.user.id);
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
