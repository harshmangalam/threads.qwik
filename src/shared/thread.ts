import type { Session } from "@auth/core/types";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { prisma } from "~/utils/prisma";

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
