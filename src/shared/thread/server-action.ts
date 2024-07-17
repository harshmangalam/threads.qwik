import { server$ } from "@builder.io/qwik-city";
import { getPrisma } from "~/utils/prisma";

export const getThreadsLikes = server$(async (threadId: string) => {
  const prisma = getPrisma((this as any)?.env);
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
  const prisma = getPrisma((this as any)?.env);
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
