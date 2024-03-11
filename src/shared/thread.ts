import type { Session } from "@auth/core/types";
import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { prisma } from "~/utils/prisma";

// eslint-disable-next-line qwik/loader-location
export const useCreateThread = routeAction$(
  async (form, { sharedMap, redirect }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, `/login`);
    }
    await prisma.thread.create({
      data: {
        ...form,
        user: {
          connect: {
            email: session.user?.email,
          },
        },
      },
    });

    throw redirect(302, `/`);
  },
  zod$((z) => ({
    text: z.string(),
    replyPrivacy: z.string(),
  })),
);
