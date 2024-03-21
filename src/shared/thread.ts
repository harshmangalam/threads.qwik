import type { Session } from "@auth/core/types";
import { routeAction$, routeLoader$, zod$ } from "@builder.io/qwik-city";
import { prisma } from "~/utils/prisma";

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
export const useGetThreads = routeLoader$(async () => {
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
  return threads;
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
